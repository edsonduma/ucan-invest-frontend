import formidable from "formidable";
import path from 'path'
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false,
  },
}

const readFile = (req, saveLocally) => {
  const options = {}

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), '/public/img')
    options.fileName = (name, ext, path, form) => {
      return Date.now().toString() + '-' + path.originalFileName
    }
  }

  const form = formidable(options)
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve(fields, files)
    })
  })
}

const handler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + '/public', 'img'))
  }
  catch (error) {
    await fs.mkdir(path.join(process.cwd() + '/public', 'img'))
  }

  await readFile(req, true)
  res.json({ done: 'ok' })
}

export default handler