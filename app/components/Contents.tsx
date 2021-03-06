import * as React from "react"

import { Demo } from "../models/Demo"
import { DemoList } from "./DemoList"
import { Pagination } from "./Pagination"

export interface ContentsProps {
    eventId?: number;
    currentPage?: number;
    pageCount?: number;
    demos?: { demo: Demo, isFavorite: boolean }[];
    getEmbedUrl?: Function;
    turnToPage?: Function;
    changeFavorite?: Function;
}

/**
 * メインコンテンツ
 */
export class Contents extends React.Component<ContentsProps, any> {
    constructor(
        public props:ContentsProps,
        public context:any
    ) {
        super(props, context);
    }

    /**
     * ページ遷移イベント
     * @param toPage 遷移先ページ
     */
    protected turnToPage = (toPage: number) => {
        // ページ上部に遷移
        document.querySelector("#content-main").scrollTop = 0;
        // コールバック呼び出しだけ
        this.props.turnToPage(toPage);
    }

    /**
     * お気に入り変更とともに通知を行う
     */
    changeFavoriteWithNotification = (eventId: number, demo: Demo, isFavorite: boolean): void => {
        let notification = document.querySelector(".mdl-js-snackbar");
        (notification as any).MaterialSnackbar.showSnackbar({
            message: isFavorite ? "お気に入りしました" : "お気に入り解除しました"
        });
        this.props.changeFavorite(eventId, demo, isFavorite);
    }

    /* render */
    render(): JSX.Element {
        return (
            <main className="mdl-layout__content demo-content__wrapper"
                id="content-main">
                <DemoList eventId={this.props.eventId}
                    demos={this.props.demos}
                    getEmbedUrl={this.props.getEmbedUrl}
                    changeFavorite={this.changeFavoriteWithNotification}
                    />
                <Pagination
                    currentPage={this.props.currentPage}
                    pageCount={this.props.pageCount}
                    turnToPage={this.turnToPage}
                    />
            </main>
        );
    }
}

