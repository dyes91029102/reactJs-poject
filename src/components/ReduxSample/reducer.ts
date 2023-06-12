
/** type */
export const MenuActionType = {
    ADD_ITEM: 'ADD_ITEM',
    CLEAN_ITEM: 'CLEAN_ITEM'
}

/** 初始 */
const initState = {
    menuItem: [
        '發問',
        '回答',
        '文章'
    ]
};

const itemReducer = (state = initState, action: any) => {
    switch (action.type) {
        case MenuActionType.ADD_ITEM:
            // 複製
            const menuItemCopy = state.menuItem.slice();
            return {
                menuItem: []
            }
        case MenuActionType.CLEAN_ITEM:
            break;
    }
}