import { bootstrap } from './components/Module'

import MyBlank from './myapp/Blank'
import Index from './myapp/Index'
import Forms from './myapp/Forms'
import SamplePages from './myapp/SamplePages'
import SecondPage from './myapp/SecondPage'
import ThirdLevelItem from './myapp/ThirdLevelItem'
import FourOhFour from './myapp/FourOhFour'

/** @type {ModuleConfig} */
const moduleConfig = {
    basename: () => {
        if (location.host === "trajano.github.io") {
            return "/reactjs-admin"
        } else {
            return ""
        }
    },
    notFoundComponent: FourOhFour,
    content: [
        {
            icon: 'dashboard',
            to: '/',
            component: Index,
            aliases: ['/index.html'],
            label: 'Dashboard'
        },
        {
            icon: 'bar-chart-o',
            label: 'Charts',
            content: [
                {
                    to: '/flot.html',
                    label: 'Flot Charts',
                    component: ThirdLevelItem
                },
                {
                    to: '/morris.html',
                    label: 'Morris.js Charts',
                    component: ThirdLevelItem
                }

            ]
        },
        {
            icon: 'edit',
            to: '/forms',
            component: Forms,
            label: 'Forms'
        },
        {
            icon: 'sitemap',
            label: 'Multi-Level Dropdown',
            content: [
                {
                    label: 'Second Level Item',
                    to: '/s1',
                    aliases: ['/index2.html'],
                    component: ThirdLevelItem
                },
                {
                    label: 'Second Level Item',
                    to: '/s2',
                    component: Forms
                },
                {
                    label: 'Third Level',
                    content: [
                        {
                            label: 'Third Level Item',
                            to: '/t1',
                            component: ThirdLevelItem,
                        },
                        {
                            label: 'Third Level Item', to: '/t2',
                            component: ThirdLevelItem,
                        },
                        {
                            label: 'Third Level Item', to: '/t3',
                            component: ThirdLevelItem,
                        },
                        {
                            label: 'Third Level Item', to: '/t4',
                            component: ThirdLevelItem,
                        }
                    ]
                }

            ]
        },

        {
            icon: 'files-o',
            label: 'Sample Pages',
            to: "/sample",
            component: SamplePages,
            content: [
                {
                    icon: 'files-o',
                    to: '/blank.html',
                    component: SecondPage,
                    label: 'Blank Page'
                },
                {
                    to: '/login.html',
                    component: MyBlank,
                    label: 'Login Page'
                }

            ]
        }
    ]
}
bootstrap(moduleConfig)
