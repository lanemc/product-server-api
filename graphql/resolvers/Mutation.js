const { v4: uuid } =require("uuid");

exports.Mutation = {
    addCategory: (parent, { input }, { db }) => {

        const { name } = input;

        const newCategory = {
            id: uuid(),
            name
        }

        db.categories.push(newCategory);

        return newCategory;
    },

    addProduct: (parent, { input }, { db }) => {
        const { 
            name,
            image,
            price,
            onSale,
            quantity,
            description,
            categoryId,
        } = input;

        const newProduct = {
            id: uuid(),
            name,
            image,
            price,
            onSale,
            quantity,
            description,
            categoryId,
        };

        db.products.push(newProduct);

        return newProduct;
    },

    addReview: (parent, { input }, { db }) => {
        const {
            date,
            title,
            comment,
            rating,
            productId
        } = input;

        const newReview = {
            id: uuid(),
            date,
            title,
            comment,
            rating,
            productId,
        };

        db.reviews.push(newReview);

        return newReview;
    },

    deleteCategory: (parent, { id }, { db }) => {

        deleteEntry(id, db.categories);

        db.products = db.products.map(product => {
            if(product.categoryId === id)
                return {
                    ...product,
                    categoryId: null
                };
            else return product;
        });
        return true;
    },

    deleteProduct: (parent, { id }, { db }) => {
        deleteEntry(id, db.products);
        db.reviews = db.reviews.filter(review => review.productId !== id);
        return true;
    },

    deleteReview: (parent, { id }, { db }) => {
        return deleteEntry(id, db.reviews);
    },

    updateCategory: (parent, { id, input }, { db }) => {
        return updateEntry(id, input, db.categories);
    },

    updateProduct: (parent, { id, input }, { db }) => {
        return updateEntry(id, input, db.products);
    },

    updateReview: (parent, { id, input }, { db }) => {
        return updateEntry(id, input, db.reviews);
    },

}

function updateEntry(id, input, data) {
    const index = data.findIndex(index => index.id === id);
    if (index === -1) return null;
    data[index] = {
        ...data[index],
        ...input
    };
    return data[index];
}

function deleteEntry(id, data) {
    return data.filter(item => item.id != id);
}