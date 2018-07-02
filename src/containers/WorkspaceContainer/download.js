import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const recurse = (zip, tree) => {
  Object.entries(tree).forEach(([key, value]) => {
    if (typeof value === 'string') {
      zip.file(key.replace('|', '.'), value)
    } else {
      const dir = zip.folder(key)
      recurse(dir, value)
    }
  })
}

export default function download(fileTree) {
  const zip = new JSZip()

  recurse(zip, fileTree)

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'app.zip')
  })
}
