import * as Joi from '@hapi/joi'
import fs from 'fs'

// This is the JOI validation schema, you define
// all the validation logic in here, then run
// the validation during the request lifecycle.
// If you prefer to use your own way of validating the 
// incoming data, you can use it.
const schema = Joi.object<import('../../types').Matrix>({
  '36months': {
      lite: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),

      standard: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),

      unlimited: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),
  },
  '24months': {
      lite: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),

      standard: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),

      unlimited: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),
  },
  '12months': {
      lite: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),

      standard: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),

      unlimited: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),
  },
  'mtm': {
      lite: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),

      standard: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),

      unlimited: Joi.number()
            .min(0.01)
            .max(999999.99)
            .required(),
  }
})

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

export default async (req: import('next').NextApiRequest, res: import('next').NextApiResponse) => {
  try {
    // This will throw when the validation fails
    const data = await schema.validateAsync(req.body, {
      abortEarly: false
    }) as import('../../types').Matrix

    // Write the new matrix to public/pricing.json
    const path = './public/pricing.json'
    fs.writeFileSync(path, JSON.stringify(data))

    // return OK & data
    res.statusCode = 200
    res.json(data)

  } catch(e) {
    console.error(e)
    if(e.isJoi) {
      // Handle the validation error and return a proper response
      res.statusCode = 422
      if (e.details[0]===undefined || e.details[0].length==0) {
        res.json({ error:'Error' })
      } else {
        res.json({ error:e.details[0].message })
      }
      return
    }
    
    res.statusCode = 500
    res.json({ error: 'Unknown Error' })
  }
}