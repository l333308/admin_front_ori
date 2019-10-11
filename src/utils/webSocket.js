import io from 'socket.io-client'
import {Notification} from 'element-ui';
import dayjs from 'dayjs'
import {getToken} from './auth'

function elementNotification(title, message, dangerouslyUseHTMLString = false,duration=0) {
    return Notification.success({
        title, message, dangerouslyUseHTMLString,duration
    })
}

export function connect() {
    let uid = getToken()

    var socket;

    if (process.env.NODE_ENV === 'development') {
        socket = io('http://localhost:6001', {path: '/ws'})
    } else if (process.env.NODE_ENV === 'staging') {
        socket = io('http://test.sa.iyoyobuy.com', {path: '/ws'});
    } else {
        socket = io('https://sa.yibianli.com', {path: '/ws'});
    }

    socket.on('connect', function () {
        console.warn('socket connect success', socket, uid)
        socket.emit('login', uid);
    });

    // 后端推送任务完成
    socket.on('exportDone', function (msg) {
        console.warn('new ws msg', msg)
        msg = JSON.parse(msg) || {}
        const body = `【${msg.filename}】已完成。点击下载，或者到导出中心下载`
        const notification = elementNotification("导出完成", body, false)
        const onClick = function () {
            if (msg.downloadUrl) {
                window.open(msg.downloadUrl, '_blank')
                notification.close()
            }
        }
        notification.onClick = onClick
        return

        // window.Notification.requestPermission(function (status) {
        //     console.log('receive export success:' + dayjs().toString(), status); // 仅当值为 "granted" 时显示通知
        //     var n = new window.Notification("导出完成", {body: `【${msg.filename}】已完成。点击下载，或者到导出中心下载`, dir: "ltr"}); // 显示通知
        //
        //     n.onclick = function (event) {
        //         console.log('notification onclick')
        //         //自动使页面聚焦到系统页面(Chrome能唤起浏览器 Firefox不能)
        //         window.focus()
        //         if (msg.downloadUrl) {
        //             window.open(msg.downloadUrl, '_blank')
        //         }
        //     }
        // });
    });

    // 后端推送第一条消息
    socket.on('first_message', function (msg) {
        console.log('first_message:' + dayjs().millisecond(), msg)
    });
}
