const { PtkType } = require('@models')

class PtkTypeController {
  async create(req, res) {
    try {
      const data = await PtkType.create(req.body)
      res.status(201).json(data)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  async read(req, res) {
    const { id } = req.params
    try {
      let data = null
      if (id === undefined) {
        data = await PtkType.findAll()
      } else {
        data = await PtkType.findByPk(id)
      }
      if (!data) {
        res.status(404).json({ message: 'PTK Type not found' })
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }

  async update(req, res) {
    const { id } = req.params
    try {
      const [updatedRowsCount, updatedRows] = await PtkType.update(req.body, {
        where: { id },
        returning: true,
      })
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: 'PTK Type not found' })
      } else {
        res.status(200).json(updatedRows[0])
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }

  async delete(req, res) {
    const { id } = req.params
    try {
      const deletedRowCount = await PtkType.destroy({ where: { id } })
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'PTK Type not found' })
      } else {
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: error.errors[0].message })
    }
  }
}

const ptkTypeController = new PtkTypeController()
module.exports = ptkTypeController