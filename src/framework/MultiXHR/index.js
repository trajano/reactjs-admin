import * as utils from './utils';
import ajax from './ajax'

function getDefaults() {
    return {
        loadPath: ['/locales/{{lng}}/{{ns}}.json'],
        addPath: 'locales/add/{{lng}}/{{ns}}',
        allowMultiLoading: false,
        parse: JSON.parse,
        crossDomain: false,
        ajax: ajax
    };
}

class CollectingCallback {
    constructor(multi, size, finalCallback) {
        this.multi = multi
        this.size = size
        this.finalCallback = finalCallback
        this.count = 0
        this.errors = []
        this.res = []
    }
    callback(err, res) {
        if (err == null || res === false) {
            ++count
        }
        if (count === size) {
            if (this.errors.length === 0) {
                finalCallback(null, this.buildRes())
            } else {
                finalCallback(this.errors.join(","), false)
            }
        }
    }
    buildRes() {
        let res = {}
        for (let i = 0; i < this.res.size; ++i) {
            if (!this.multi) {
                Object.assign(res, this.res[i])
            } else {
                console.error("Unsupported as of yet")
                // for multi you need to read each key and do Object assign on the key rather than the top level otherwise we'd overwrite each language completely.
            }
        }
        return res
    }
}
class Backend {
    constructor(services, options = {}) {
        this.init(services, options);
        console.log("MultiXHR")
        this.type = 'backend';
    }

    init(services, options = {}) {
        this.services = services;
        this.options = utils.defaults(options, this.options || {}, getDefaults());
    }

    readMulti(languages, namespaces, callback) {
        var loadPath = this.options.loadPath;
        if (typeof this.options.loadPath === 'function') {
            loadPath = this.options.loadPath(languages, namespaces);
        }

        this.reallyReadMulti(loadPath[0], language, namespace, callback)

    }

    read(language, namespace, callback) {
        var loadPath = this.options.loadPath;
        if (typeof this.options.loadPath === 'function') {
            loadPath = this.options.loadPath([language], [namespace]);
        }

        this.reallyRead(loadPath[0], language, namespace, callback)
    }

    reallyRead(loadPath, language, namespace, callback) {
        let url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });

        this.loadUrl(url, callback);
    }

    reallyReadMulti(loadPath, language, namespace, callback) {
        let url = this.services.interpolator.interpolate(loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

        this.loadUrl(url, callback);
    }

    loadUrl(url, callback) {
        this.options.ajax(url, this.options, (data, xhr) => {
            if (xhr.status >= 500 && xhr.status < 600) return callback('failed loading ' + url, true /* retry */);
            if (xhr.status >= 400 && xhr.status < 500) return callback('failed loading ' + url, false /* no retry */);

            let ret, err;
            try {
                ret = this.options.parse(data, url);
            } catch (e) {
                err = 'failed parsing ' + url + ' to json';
            }
            if (err) return callback(err, false);
            callback(null, ret);
        });
    }

    create(languages, namespace, key, fallbackValue) {
        if (typeof languages === 'string') languages = [languages];

        let payload = {};
        payload[key] = fallbackValue || '';

        languages.forEach(lng => {
            let url = this.services.interpolator.interpolate(this.options.addPath, { lng: lng, ns: namespace });

            this.options.ajax(url, this.options, function (data, xhr) {
                //const statusCode = xhr.status.toString();
                // TODO: if statusCode === 4xx do log
            }, payload);
        });
    }
}

Backend.type = 'backend';


export default Backend;