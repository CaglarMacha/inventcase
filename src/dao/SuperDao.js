

class SuperDao {
    constructor(model) {
        this.Model = model;
    }

    async findAll() {
        return this.Model.findAll()
            .then((result) => {
                return result;
            })
            .catch((e) => {
                // console.Log(e)
                console.log(e);
            });
    }

    async findById(id) {
        return this.Model.findByPk(id)
            .then((result) => {
                return result;
            })
            .catch((e) => {
                       // console.Log(e)
                console.log(e);
            });
    }

    async findOneByWhere(where, attributes = null, order = ['id', 'desc']) {
        if (attributes == null) {
            return this.Model.findOne({
                where,
                order: [order],
            })
                .then((result) => {
                    return result;
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        return this.Model.findOne({
            where,
            attributes,
            order: [order],
        })
            .then((result) => {
                return result;
            })
            .catch((e) => {
                console.log(e);
            });
    }

    async updateWhere(data, where) {
        return this.Model.update(data, { where })
            .then((result) => {
                return result;
            })
            .catch((e) => {
                console.log(e);
            });
    }

    async updateById(data, id) {
        return this.Model.update(data, { where: { id } })
            .then((result) => {
                return result;
            })
            .catch((e) => {
                console.Log(e)
                console.log(e);
            });
    }

    async create(data) {
        try {
            const newData = new this.Model(data);
            return newData
                .save()
                .then((result) => {
                    return result;
                })
                .catch((e) => {
                    console.log(e)
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    async deleteByWhere(where) {
        return this.Model.destroy({ where });
    }
    async checkExist(condition) {
        return this.Model.count({ where: condition }).then((count) => {
            if (count !== 0) {
                return true;
            }
            return false;
        });
    }
}
module.exports = SuperDao;
