export function updateSelection(selection, pageSelection, pageItems, compareKey) {
    for (let i = 0; i < pageSelection.length; i++) {
        const item = pageSelection[i]
        // to push
        let add = true
        selection.forEach(x => {
            if (x[compareKey] === item[compareKey]) {
                add = false
            }
        })
        console.log('add?', item, add)
        if (add) {
            selection.push(item)
        }
    }
    for (let i = 0; i < pageItems.length; i++) {
        const item = pageItems[i]
        // to delete
        let remove = true
        pageSelection.forEach(x => {
            if (x[compareKey] === item[compareKey]) {
                remove = false
            }
        })
        console.log('delete?', item, remove)
        if (remove) {
            for (let j = 0; j < selection.length; j++) {
                if (selection[j][compareKey] === item[compareKey]) {
                    selection.splice(j, 1)
                    j--
                }
            }
        }
    }
    return selection
}

// 根据数据触发勾选
export function toggleSelection(dialog) {
    const self = dialog
    const key = self.compareKey
    console.log('dialog selected items ', dialog.value)
    let selectedKeys = {}
    self.value.forEach(x => {
        selectedKeys[x[key]] = true
    })
    setTimeout(function () {
        self.pageItems.forEach(x => {
            if (selectedKeys[x[key]]) {
                self.$refs.multipleTable.toggleRowSelection(x, true) // 必须传true
            } else {
                self.$refs.multipleTable.toggleRowSelection(x, false) // 必须传true
            }
        })
    }, 500)
}

// 勾选变化
export function selectionChange(dialog, selection) {
    let self = dialog
    const key = self.compareKey
    self.value = updateSelection(self.value, selection, self.pageItems, key)
    console.warn('emit change', self.value)
    self.$emit('change', self.value || [])
}

// 显示批量勾选弹窗
export function show(dialog) {
    let self = dialog
    self.showDialog = true
    self.toggleSelection()
}
