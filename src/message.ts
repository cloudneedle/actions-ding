export interface ActionCard {
    msgtype: string;
    actionCard: {
        title: string;
        text: string;
        btnOrientation: "0"|"1"; // 0: 按钮竖直排列, 1: 按钮横向排列
        btns: Array<{
            title: string;
            actionURL: string;
        }>;
    };
}

