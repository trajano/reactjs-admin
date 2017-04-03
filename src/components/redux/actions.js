export const UPDATE_NAV_ACTIVE_PATH = Symbol("UPDATE_NAV_ACTIVE_PATH")

/**
 * Sets a mew navigation path
 * @param {number[]} newActivePath new active path
 */
export function updateNavActivePath(newActivePath) {
    return { type: UPDATE_NAV_ACTIVE_PATH, newActivePath }
}
