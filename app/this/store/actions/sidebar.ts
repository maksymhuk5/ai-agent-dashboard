export const CHANGE_SIDEBAR_COLLAPSED = "CHANGE_SIDEBAR_COLLAPSED";

export const changeSidebarCollapsed = (collapsed: boolean) => {
    return {
        type: CHANGE_SIDEBAR_COLLAPSED,
        payload: collapsed,
    };
};