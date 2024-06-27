const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Category = require('./category'); // Impor model Category
const Supplier = require('./supplier');
const Product = sequelize.define('Product', {
 productID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    productName: {
    type: DataTypes.STRING,
    allowNull: false
    },
    supplierID: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    supplierID:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
         model:Supplier,
         key:"supplierID"
      }
    },
    unit: {
    type: DataTypes.STRING,
    allowNull: false
    },
    price: {
    type: DataTypes.DECIMAL,
    allowNull: false
    }
   },{
      timestamps:false
   });

   // Definisikan relasi
   Product.belongsTo(Category, {foreignKey:'categoryID'});
   Category.hasMany(Product, {foreignKey:'categoryID'});

   //Relasi produk dan supplier
   Product.belongsTo(Supplier, {foreignKey:'supplierID'});
   Supplier.hasMany(Product, {foreignKey:'supplierID'});

   module.exports = Product;
   
   