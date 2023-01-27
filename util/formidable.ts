import express from 'express'
import formidable from 'formidable'
export const uploadDir = 'uploads'

export const form = formidable({
	uploadDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 10 * 1024 ** 3, // the default limit is 200KB
	filter: (part) => part.mimetype?.startsWith('image/') || false,
	filename: (originalName, originalExt, part, form) => {
		let fieldName = part.name
		let timestamp = Date.now()
		let ext = part.mimetype?.split('/').pop()
		return `${fieldName}-${timestamp}.${ext}`
	}
})

export function formParsePromise(req: express.Request) {
	return new Promise<any>((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			// console.log({ err, fields, files });

			if (err) {
				reject(err)
				return
			}

			resolve({
				fields,
				files
			})
		})
	})
}
