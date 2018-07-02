export default function copyNodeText() {
  const d = document.getElementById('frame').contentDocument
  const e = d.getElementById('editor')
  if (d.getSelection) {
    const s = d.getSelection()
    const r = d.createRange()
    r.selectNode(e)
    s.removeAllRanges()
    s.addRange(r)
  } else if (d.selection) {
    const r = d.body.createTextRange()
    r.moveToElementText(e)
    r.select()
  }

  let text = ''
  if (d.getSelection) {
    text = d.getSelection().toString()
  } else if (d.selection && d.selection.type !== 'Control') {
    text = d.selection.createRange().text // eslint-disable-line prefer-destructuring
  }
  return text
}

// /* eslint-disable */
// export default function copyNodeText(node) {
//   ;(function selectText(e, r, s, d) {
//     d = document
//     if ((s = window.getSelection)) {
//       ;(r = d.createRange()).selectNode(e)
//       ;(s = s()).removeAllRanges()
//       s.addRange(r)
//     } else if (d.selection) {
//       ;(r = d.body.createTextRange()).moveToElementText(e)
//       r.select()
//     }
//   })(node)

  // return (function getSelectionText() {
  //     var text = ''
  //     if (window.getSelection) {
  //       text = window.getSelection().toString()
  //     } else if (document.selection && document.selection.type !== 'Control') {
  //       text = document.selection.createRange().text
  //     }
  //     return text
  //   })()

//   // ;(function clearSelection() {
//   //   if (window.getSelection) {
//   //     window.getSelection().removeAllRanges()
//   //   } else if (document.selection) {
//   //     document.selection.empty()
//   //   }
//   // })()
// }
