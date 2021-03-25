import React from 'react'

export const offlineBarRef = React.createRef()

function showOfflineStatusBar() {
    offlineBarRef && offlineBarRef.current && offlineBarRef.current.showBanner()
}

function hideOfflineStatusBar() {
    offlineBarRef && offlineBarRef.current && offlineBarRef.current.hideBannner()
}

export {
    showOfflineStatusBar,
    hideOfflineStatusBar
}