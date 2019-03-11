
import User from './api/user/user.model';
import Product from './api/product/product.model';
import Brand from './api/brand/brand.model';
import Category from './api/category/category.model';
import Feature from './api/feature/feature.model';
import Coupon from './api/coupon/coupon.model';
import Shipping from './api/shipping/shipping.model';
import Address from './api/address/address.model';

User.find(function (err, data) {
  if (data.length < 1) {
    User.create({
      _id: '57c087895c0f110799b4c82d',
      provider: 'local',
      name: 'Test User',
      email: 'user@sportscenter.com',
      password: 'qwerty',
      parentID :''
    }, {
        _id: '57c087895c0f110799b4c82e',
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@sportscenter.com',
        password: 'qwerty',
        parentID :''
      }, {
        provider: 'local',
        role: 'vendor',
        name: 'Vendor',
        email: 'vendor@sportscenter.com',
        password: 'qwerty',
        parentID :''
      }, {
        provider: 'local',
        role: 'privatevendor',
        name: 'Vendor',
        email: 'privatevendor@sportscenter.com',
        password: 'qwerty',
        parentID :''
      }, {
        provider: 'local',
        role: 'manager',
        name: 'Manager',
        email: 'manager@sportscenter.com',
        password: 'qwerty',
        parentID :''
      }, function () {
        User.find({}, function (err, data) { data.forEach(data => { data.save() }); })
        console.log('finished populating users');
      });
  }
});

Address.find(function (err, data) {
  if (data.length < 1) {
    Address.create(
      {
        "__v": 0,
        "_id": "57c087e05c0f110799b4c939",
        "active": true,
        "address": "K-250",
        "city": "Bhubaneswar",
        "country": "India",
        "name": "Ipsita Sahoo",
        "phone": "0000000000",
        "state": "Odisha",
        "uid": "57c087895c0f110799b4c82e",
        "zip": 765001
      },
      {
        "country": "India",
        "name": "Ipsita Sahoo",
        "address": "AB/1234",
        "city": "Rourkela",
        "zip": 769044,
        "state": "Odisha",
        "phone": "0000000000",
        "uid": "57c087895c0f110799b4c82e",
        "_id": "57d6b6f2944efb02ba415406",
        "active": true,
        "__v": 0
      }, function () {
        Address.find({}, function (err, data) { data.forEach(data => { data.save() }); })
        console.log('finished populating address');
      }
    );
  }
});

Shipping.find(function (err, data) {
  if (data.length < 1) {
    Shipping.create(
      {
        "_id": "561f73dbe87e75d814a98f5a",
        "carrier": "DTDC",
        "country": "India",
        "charge": 100,
        "minWeight": 0,
        "maxWeight": 200,
        "freeShipping": 500,
        "active": true,
        "__v": 0,
        "name": "DTDC"
      },
      {
        "__v": 0,
        "_id": "561f7ff6fb2f8dac199a618f",
        "active": true,
        "carrier": "UPS",
        "charge": 500,
        "country": "India",
        "freeShipping": 5000,
        "maxWeight": 100,
        "minWeight": 0
      },
      {
        "__v": 0,
        "_id": "561f801ffb2f8dac199a6190",
        "active": true,
        "carrier": "DHL",
        "charge": 300,
        "country": "India",
        "freeShipping": 3000,
        "maxWeight": 200,
        "minWeight": 0
      },
      {
        "_id": "561f804dfb2f8dac199a6191",
        "carrier": "DHL",
        "country": "India",
        "charge": 50,
        "minWeight": 100,
        "maxWeight": 500,
        "freeShipping": 1000,
        "active": true,
        "__v": 0
      }, function () {
        Shipping.find({}, function (err, data) { data.forEach(data => { data.save() }); })
        console.log('finished populating shippings');
      }
    );
  }
});

Coupon.find(function (err, data) {
  if (data.length < 1) {
    Coupon.create(
      {
        "__v": 0,
        "_id": "561cbd6fc3c4fab4009caa0e",
        "active": true,
        "amount": 100,
        "code": "A100",
        "info": "Rs 100 discount on all products above Rs 500",
        "minimumCartValue": 500,
        "type": "Discount"
      }, function () {
        Coupon.find({}, function (err, data) { data.forEach(data => { data.save() }); })
        console.log('finished populating coupons');
      }
    );
  }
});

Feature.find(function (err, data) {
  if (data.length < 1) {
    Feature.create(
      {
        "key": "Type",
        "val": "Blouses",
        "active": true,
        "_id": "57c087895c0f110799b4c839",
        "__v": 0
      },
      {
        "key": "Type",
        "val": "Gown",
        "active": true,
        "_id": "57c087895c0f110799b4c83a",
        "__v": 0
      },
      {
        "key": "Fit",
        "val": "Slim",
        "active": true,
        "_id": "57c087895c0f110799b4c83b",
        "__v": 0
      },
      {
        "key": "Fit",
        "val": "Regular",
        "active": true,
        "_id": "57c087895c0f110799b4c83e",
        "__v": 0
      },
      {
        "key": "Fit",
        "val": "Tight",
        "active": true,
        "_id": "57c087895c0f110799b4c83c",
        "__v": 0
      },
      {
        "key": "Fabric",
        "val": "Polyester",
        "active": true,
        "_id": "57c087895c0f110799b4c840",
        "__v": 0
      },
      {
        "key": "Fabric",
        "val": "Cotton",
        "active": true,
        "_id": "57c087895c0f110799b4c83f",
        "__v": 0
      },
      {
        "key": "Fit",
        "val": "Loose",
        "active": true,
        "_id": "57c087895c0f110799b4c83d",
        "__v": 0
      },
      {
        "key": "Neck",
        "val": "Round Neck",
        "active": true,
        "_id": "57c087895c0f110799b4c841",
        "__v": 0
      },
      {
        "key": "Neck",
        "val": "Collar",
        "active": true,
        "_id": "57c087895c0f110799b4c842",
        "__v": 0
      },
      {
        "key": "Color",
        "val": "Red",
        "active": true,
        "_id": "57c087895c0f110799b4c843",
        "__v": 0
      },
      {
        "key": "Color",
        "val": "Green",
        "active": true,
        "_id": "57c087895c0f110799b4c844",
        "__v": 0
      },
      {
        "key": "Color",
        "val": "Blue",
        "active": true,
        "_id": "57c087895c0f110799b4c845",
        "__v": 0
      },
      {
        "key": "Color",
        "val": "White",
        "active": true,
        "_id": "57c087895c0f110799b4c846",
        "__v": 0
      }, function () {
        Feature.find({}, function (err, data) { data.forEach(data => { data.save() }); })
        console.log('finished populating features');
      }
    );
  }
});

// Product.find(function (err, data) {
//   if (data.length < 1) {
//     Product.create(

//       {
//         "__v": 2,
//         "_id": "57c18240993c5f4354000000",
//         "active": true,
//         "brand": "57c17dce993c5faed8000001",
//         "category": "57c1904f993c5fe64d000001",
//         "isglobal" :true,
//         "features": [
//           {
//             "val": "Skinny Fit",
//             "key": "Type"
//           },
//           {
//             "val": "Slim",
//             "key": "Fit"
//           },
//           {
//             "val": "Stretch",
//             "key": "Fabric"
//           },
//           {
//             "val": "Blue",
//             "key": "Color"
//           },
//           {
//             "val": "This model has height 6'2\",Chest 39\",Waist 32\"and is Wearing Size 30.",
//             "key": "Model Stats"
//           }
//         ],
//         "info": "FLYING MACHINE presents these blue coloured jeans, which will be perfect for regular wear. These skinny-fit jeans are made from stretch cotton, which will keep you comfortable all day. These will work well with most of your cool T-shirts and comfy footwear.",
//         "keyFeatures": [
//           {
//             "key": "Fit",
//             "val": "Slim"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "Flying MachineBlue Low Rise Skinny Fit Jeans (Jackson)",
//         "nameLower": "flying machineblue low rise skinny fit jeans (jackson)",
//         "sku": 35,
//         "slug": "flying-machineblue-low-rise-skinny-fit-jeans-jackson",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "jPFrHVIis_Lh_gp7HLolDnOs.jpg",
//             "mrp": 2299,
//             "price": 2299,
//             "size": "30",
//             "_id": "57cea23de804f70584e81d14"
//           },
//           {
//             "image": "",
//             "mrp": 2299,
//             "price": 2299,
//             "size": "32",
//             "_id": "57cea23de804f70584e81d13"
//           },
//           {
//             "image": "",
//             "mrp": 2299,
//             "price": 2299,
//             "size": "34",
//             "_id": "57cea23de804f70584e81d12"
//           },
//           {
//             "image": "",
//             "mrp": 2299,
//             "price": 2299,
//             "size": "36",
//             "_id": "57cea23de804f70584e81d11"
//           },
//           {
//             "image": "",
//             "mrp": 2299,
//             "price": 2299,
//             "size": "38",
//             "_id": "57cea23de804f70584e81d10"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18256993c5f5d54000001",
//         "active": true,
//         "brand": "5607c599dddfb6780c5bddf4",
//         "category": "57c19208993c5fc13f00000c",
//         "isglobal" :true,
//         "features": [
//           {
//             "key": "Type",
//             "val": "Casual Jackets"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Sleeves",
//             "val": "Full Sleeves"
//           },
//           {
//             "key": "Neck",
//             "val": "COLLAR"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Wash Care",
//             "val": "Wash with similar colors, Dry Promptly, Steam Iron, Do Not Bleach, Do Not Wring"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           },
//           {
//             "key": "Style",
//             "val": "Solid"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 6'0\",Chest 38\",Waist 33\"and is Wearing Size M."
//           }
//         ],
//         "info": "Step out in style in that chilly weather wearing this jacket from Fort Collins. Made from cotton, this jacket will last you for a long time. It features a front zipper, which allows this jacket to embrace your body in a perfect fit. Also the high-neck collar adds to its visual appeal. Wear it with denims and boots of your choice for a sturdy look. ",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "Fort CollinsBlue Solid Casual Jacket",
//         "nameLower": "fort collinsblue solid casual jacket",
//         "sku": 37,
//         "slug": "fort-collinsblue-solid-casual-jacket",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "IHEVbE34afH8D_W7TFR4vJlA.jpg",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "M",
//             "_id": "57cea134e804f70584e81d0b"
//           },
//           {
//             "mrp": 2599,
//             "price": 2599,
//             "size": "L",
//             "image": "dog-889376_640.jpg",
//             "_id": "57cea134e804f70584e81d0a"
//           },
//           {
//             "price": 2599,
//             "size": "XL",
//             "image": "dog-889376_640.jpg",
//             "mrp": 2599,
//             "_id": "57cea134e804f70584e81d09"
//           },
//           {
//             "size": "XXL",
//             "image": "dog-889376_640.jpg",
//             "mrp": 2599,
//             "price": 2599,
//             "_id": "57cea134e804f70584e81d08"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18280993c5f4354000001",
//         "active": true,
//         "brand": "57c17a41993c5f81f9000000",
//         "category": "57c198e2993c5fc13f00000f",
//         "isglobal" :true,
//         "features": [
//           {
//             "key": "Type",
//             "val": "Casual Jackets"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Sleeves",
//             "val": "Full Sleeves"
//           },
//           {
//             "key": "Neck",
//             "val": "COLLAR"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Wash Care",
//             "val": "Wash with similar colors, Dry Promptly, Steam Iron, Do Not Bleach, Do Not Wring"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           },
//           {
//             "key": "Style",
//             "val": "Solid"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 6'0\",Chest 38\",Waist 33\"and is Wearing Size M."
//           }
//         ],
//         "info": "Step out in style in that chilly weather wearing this jacket from Fort Collins. Made from cotton, this jacket will last you for a long time. It features a front zipper, which allows this jacket to embrace your body in a perfect fit. Also the high-neck collar adds to its visual appeal. Wear it with denims and boots of your choice for a sturdy look. ",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "Fort CollinsBlue Solid Casual Jacket",
//         "nameLower": "fort collinsblue solid casual jacket",
//         "sku": 37,
//         "slug": "fort-collinsblue-solid-casual-jacket",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "-KBlIEp5vF2oMyuKqE9EgNWv.jpg",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "M",
//             "_id": "57cea116e804f70584e81d07"
//           },
//           {
//             "mrp": 2599,
//             "price": 2599,
//             "size": "L",
//             "image": "dog-889376_640.jpg",
//             "_id": "57cea116e804f70584e81d06"
//           },
//           {
//             "price": 2599,
//             "size": "XL",
//             "image": "dog-889376_640.jpg",
//             "mrp": 2599,
//             "_id": "57cea116e804f70584e81d05"
//           },
//           {
//             "size": "XXL",
//             "image": "dog-889376_640.jpg",
//             "mrp": 2599,
//             "price": 2599,
//             "_id": "57cea116e804f70584e81d04"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c182b2993c5f5d54000002",
//         "active": true,
//         "brand": "57c17a41993c5f81f9000000",
//         "category": "57c1919a993c5fe64d000007","isglobal" :true,
//         "features": [
//           {
//             "key": "Type",
//             "val": "Round Neck T-Shirts"
//           },
//           {
//             "key": "Fabric",
//             "val": "Stretch"
//           },
//           {
//             "key": "Sleeves",
//             "val": "Half Sleeves"
//           },
//           {
//             "val": "Round Neck",
//             "key": "Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Slim"
//           },
//           {
//             "key": "Color",
//             "val": "Black"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 6'4\",Chest 38\",Waist 31\"and is Wearing Size M."
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Slim"
//           }
//         ],
//         "name": "Calvin Klein JeansBlack Round Neck T-Shirt",
//         "nameLower": "calvin klein jeansblack round neck t-shirt",
//         "sku": 21,
//         "slug": "calvin-klein-jeansblack-round-neck-t-shirt",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "size": "S",
//             "image": "Nkjo1oJY0RISOUCMDMx_IE-7.jpg",
//             "mrp": 3299,
//             "price": 3299,
//             "_id": "57cea2e5e804f70584e81d42"
//           },
//           {
//             "image": "",
//             "mrp": 3299,
//             "price": 3299,
//             "size": "M",
//             "_id": "57cea2e5e804f70584e81d41"
//           },
//           {
//             "image": "",
//             "mrp": 3299,
//             "price": 3299,
//             "size": "L",
//             "_id": "57cea2e5e804f70584e81d40"
//           },
//           {
//             "image": "",
//             "mrp": 3299,
//             "price": 3299,
//             "size": "XL",
//             "_id": "57cea2e5e804f70584e81d3f"
//           },
//           {
//             "image": "",
//             "mrp": 3299,
//             "price": 3299,
//             "size": "XXL",
//             "_id": "57cea2e5e804f70584e81d3e"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c182d0993c5f4354000002",
//         "active": true,
//         "brand": "5607c5c1dddfb6780c5bddf8",
//         "category": "57c198e2993c5fc13f00000f","isglobal" :true,
//         "features": [
//           {
//             "key": "Type",
//             "val": "Round Neck T-Shirts"
//           },
//           {
//             "key": "Fabric",
//             "val": "Stretch"
//           },
//           {
//             "key": "Sleeves",
//             "val": "Half Sleeves"
//           },
//           {
//             "val": "Round Neck",
//             "key": "Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Slim"
//           },
//           {
//             "key": "Color",
//             "val": "Black"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 6'4\",Chest 38\",Waist 31\"and is Wearing Size M."
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Slim"
//           }
//         ],
//         "name": "Calvin Klein JeansBlack Round Neck T-Shirt",
//         "nameLower": "calvin klein jeansblack round neck t-shirt",
//         "sku": 21,
//         "slug": "calvin-klein-jeansblack-round-neck-t-shirt",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "size": "S",
//             "image": "m3DWWG6cqzYzbvBMbRVX3w0-.jpg",
//             "mrp": 3299,
//             "price": 3299,
//             "_id": "57cea2bae804f70584e81d3d"
//           },
//           {
//             "image": "",
//             "mrp": 3299,
//             "price": 3299,
//             "size": "M",
//             "_id": "57cea2bae804f70584e81d3c"
//           },
//           {
//             "image": "",
//             "mrp": 3299,
//             "price": 3299,
//             "size": "L",
//             "_id": "57cea2bae804f70584e81d3b"
//           },
//           {
//             "image": "",
//             "mrp": 3299,
//             "price": 3299,
//             "size": "XL",
//             "_id": "57cea2bae804f70584e81d3a"
//           },
//           {
//             "image": "",
//             "mrp": 3299,
//             "price": 3299,
//             "size": "XXL",
//             "_id": "57cea2bae804f70584e81d39"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c182fa993c5f5d54000003",
//         "active": true,
//         "brand": "57c17d4c993c5f81f9000001",
//         "category": "57c191b2993c5fc13f00000a","isglobal" :true,
//         "features": [
//           {
//             "key": "Type",
//             "val": "Regular Fit"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Fabric",
//             "val": "Stretch"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           },
//           {
//             "key": "Wash Care",
//             "val": "y Clean Any SolvenNormal 40?c Do Not Bleach Warm Iron Dry Clean-F Dr"
//           },
//           {
//             "key": "Style",
//             "val": "Solid"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 6'4\",Chest 38\",Waist 31\"and is Wearing Size 32."
//           }
//         ],
//         "info": "Look hot on a cool evening wearing these blue coloured jeans from GAS. Made from stretch cotton fabric, these jeans offer you a perfect fit and a trendy look. Pair these jeans with your favourite T-shirt and sneakers for a stylish look. ",
//         "keyFeatures": [
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "GasBlue Mid Rise Regular Fit Jeans",
//         "nameLower": "gasblue mid rise regular fit jeans",
//         "sku": 43,
//         "slug": "gasblue-mid-rise-regular-fit-jeans",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "CPDeV2S-ku75siwbMmfYWVzv.jpg",
//             "mrp": 7990,
//             "price": 7990,
//             "size": "30",
//             "_id": "57cea0e4e804f70584e81cfe"
//           },
//           {
//             "image": "",
//             "mrp": 7990,
//             "price": 7990,
//             "size": "32",
//             "_id": "57cea0e4e804f70584e81cfd"
//           },
//           {
//             "image": "",
//             "mrp": 7990,
//             "price": 7990,
//             "size": "34",
//             "_id": "57cea0e4e804f70584e81cfc"
//           },
//           {
//             "image": "",
//             "mrp": 7990,
//             "price": 7990,
//             "size": "36",
//             "_id": "57cea0e4e804f70584e81cfb"
//           },
//           {
//             "image": "",
//             "mrp": 7990,
//             "price": 7990,
//             "size": "38",
//             "_id": "57cea0e4e804f70584e81cfa"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c1833f993c5f4354000003",
//         "active": true,
//         "brand": "57c17e6e993c5faed8000003",
//         "category": "57c19929993c5fe64d00000e","isglobal" :true,
//         "features": [
//           {
//             "key": "Type",
//             "val": "Regular Fit"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Fabric",
//             "val": "Stretch"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           },
//           {
//             "key": "Wash Care",
//             "val": "y Clean Any SolvenNormal 40?c Do Not Bleach Warm Iron Dry Clean-F Dr"
//           },
//           {
//             "key": "Style",
//             "val": "Solid"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 6'4\",Chest 38\",Waist 31\"and is Wearing Size 32."
//           }
//         ],
//         "info": "Look hot on a cool evening wearing these blue coloured jeans from GAS. Made from stretch cotton fabric, these jeans offer you a perfect fit and a trendy look. Pair these jeans with your favourite T-shirt and sneakers for a stylish look. ",
//         "keyFeatures": [
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "GasBlue Mid Rise Regular Fit Jeans",
//         "nameLower": "gasblue mid rise regular fit jeans",
//         "sku": 43,
//         "slug": "gasblue-mid-rise-regular-fit-jeans",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "ObBHwxqiTgsKf5WEzzmAhsQX.jpg",
//             "mrp": 7990,
//             "price": 7990,
//             "size": "30",
//             "_id": "57cea0cfe804f70584e81cf9"
//           },
//           {
//             "image": "",
//             "mrp": 7990,
//             "price": 7990,
//             "size": "32",
//             "_id": "57cea0cfe804f70584e81cf8"
//           },
//           {
//             "image": "",
//             "mrp": 7990,
//             "price": 7990,
//             "size": "34",
//             "_id": "57cea0cfe804f70584e81cf7"
//           },
//           {
//             "image": "",
//             "mrp": 7990,
//             "price": 7990,
//             "size": "36",
//             "_id": "57cea0cfe804f70584e81cf6"
//           },
//           {
//             "image": "",
//             "mrp": 7990,
//             "price": 7990,
//             "size": "38",
//             "_id": "57cea0cfe804f70584e81cf5"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c183d8993c5f5d54000004",
//         "active": true,
//         "brand": "57c17e42993c5f81f9000004",
//         "category": "57c1913a993c5fc13f000008","isglobal" :true,
//         "features": [
//           {
//             "key": "Type",
//             "val": "Round Neck T-Shirts"
//           },
//           {
//             "val": "Cotton",
//             "key": "Fabric"
//           },
//           {
//             "key": "Sleeves",
//             "val": "Half Sleeves"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Slim"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           },
//           {
//             "key": "Style",
//             "val": "Printed"
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Slim"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "French ConnectionBlue Printed Round Neck T-Shirt",
//         "nameLower": "french connectionblue printed round neck t-shirt",
//         "sku": 39,
//         "slug": "french-connectionblue-printed-round-neck-t-shirt",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "6wuVnfABGn_cervN2GaZNduB.jpg",
//             "mrp": 1499,
//             "price": 1499,
//             "size": "S",
//             "_id": "57cea0fde804f70584e81d03"
//           },
//           {
//             "image": "",
//             "mrp": 1499,
//             "price": 1499,
//             "size": "M",
//             "_id": "57cea0fde804f70584e81d02"
//           },
//           {
//             "image": "",
//             "mrp": 1499,
//             "price": 1499,
//             "size": "L",
//             "_id": "57cea0fde804f70584e81d01"
//           },
//           {
//             "image": "",
//             "mrp": 1499,
//             "price": 1499,
//             "size": "XL",
//             "_id": "57cea0fde804f70584e81d00"
//           },
//           {
//             "mrp": 1499,
//             "price": 1499,
//             "size": "XXL",
//             "image": "",
//             "_id": "57cea0fde804f70584e81cff"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c183fb993c5f4354000004",
//         "active": true,"isglobal" :true,
//         "features": [
//           {
//             "key": "Type",
//             "val": "Regular Fit"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "val": "Blue",
//             "key": "Color"
//           },
//           {
//             "key": "Wash Care",
//             "val": ", Flat Dry In Shadee Mild Detergent, Do Not Bleach, Do Not Tumble DryMachine Wash Cold, Wash Dark Colour Separately, Us"
//           },
//           {
//             "key": "Style",
//             "val": "Washed"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 6'1\",Chest 40\",Waist 31\"and is Wearing Size 32."
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "LeeBlue Mid Rise Regular Fit Jeans (Victory-A)",
//         "nameLower": "leeblue mid rise regular fit jeans (victory-a)",
//         "sku": 62,
//         "slug": "leeblue-mid-rise-regular-fit-jeans-victory-a",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "6KhT0jQ2BRPayJI0A3qNOqzh.jpg",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "30",
//             "_id": "57cea077e804f70584e81ce7"
//           },
//           {
//             "image": "",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "32",
//             "_id": "57cea077e804f70584e81ce6"
//           },
//           {
//             "image": "",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "34",
//             "_id": "57cea077e804f70584e81ce5"
//           },
//           {
//             "image": "",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "36",
//             "_id": "57cea077e804f70584e81ce4"
//           },
//           {
//             "image": "",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "38",
//             "_id": "57cea077e804f70584e81ce3"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18451993c5f5d54000005",
//         "active": true,
//         "brand": "57c17e9f993c5f81f9000005",
//         "category": "57c1904f993c5fe64d000001",
//         "features": [
//           {
//             "key": "Type",
//             "val": "Regular Fit"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "val": "Blue",
//             "key": "Color"
//           },
//           {
//             "key": "Wash Care",
//             "val": ", Flat Dry In Shadee Mild Detergent, Do Not Bleach, Do Not Tumble DryMachine Wash Cold, Wash Dark Colour Separately, Us"
//           },
//           {
//             "key": "Style",
//             "val": "Washed"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 6'1\",Chest 40\",Waist 31\"and is Wearing Size 32."
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "LeeBlue Mid Rise Regular Fit Jeans (Victory-A)",
//         "nameLower": "leeblue mid rise regular fit jeans (victory-a)",
//         "sku": 62,
//         "slug": "leeblue-mid-rise-regular-fit-jeans-victory-a",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "xVFdJqCjhQC-xHq3ctAn8QCp.jpg",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "30",
//             "_id": "57cea05ce804f70584e81ce2"
//           },
//           {
//             "image": "",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "32",
//             "_id": "57cea05ce804f70584e81ce1"
//           },
//           {
//             "image": "",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "34",
//             "_id": "57cea05ce804f70584e81ce0"
//           },
//           {
//             "image": "",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "36",
//             "_id": "57cea05ce804f70584e81cdf"
//           },
//           {
//             "image": "",
//             "mrp": 2599,
//             "price": 2599,
//             "size": "38",
//             "_id": "57cea05ce804f70584e81cde"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c1847d993c5f4354000005",
//         "active": true,
//         "brand": "57c17ecf993c5faed8000004",
//         "category": "57c1907a993c5fe64d000002",
//         "features": [
//           {
//             "key": "Type",
//             "val": "Henley T-Shirts"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "val": "Half Sleeves",
//             "key": "Sleeves"
//           },
//           {
//             "key": "Neck",
//             "val": "Henley"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "Black"
//           },
//           {
//             "key": "Wash Care",
//             "val": "Normal Hand Machine Wash With Like Colors"
//           },
//           {
//             "key": "Style",
//             "val": "Solid"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 6'4\",Chest 38\",Waist 31\"and is Wearing Size L."
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "val": "Regular",
//             "key": "Fit"
//           }
//         ],
//         "name": "Levi'sBlack Solid Henley T-Shirt",
//         "nameLower": "levi'sblack solid henley t-shirt",
//         "sku": 66,
//         "slug": "levisblack-solid-henley-t-shirt",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "size": "S",
//             "image": "OtZ3me5Rxf0mlMLuH4otg3fd.jpg",
//             "mrp": 1399,
//             "price": 1399,
//             "_id": "57cea007e804f70584e81cd8"
//           },
//           {
//             "mrp": 1399,
//             "price": 1399,
//             "size": "M",
//             "image": "",
//             "_id": "57cea007e804f70584e81cd7"
//           },
//           {
//             "image": "",
//             "mrp": 1399,
//             "price": 1399,
//             "size": "L",
//             "_id": "57cea007e804f70584e81cd6"
//           },
//           {
//             "price": 1399,
//             "size": "XL",
//             "image": "",
//             "mrp": 1399,
//             "_id": "57cea007e804f70584e81cd5"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18496993c5f5d54000006",
//         "active": true,
//         "brand": "57c17d4c993c5f81f9000001",
//         "category": "57c19150993c5fe64d000006",
//         "features": [
//           {
//             "val": "Slim",
//             "key": "Fit"
//           },
//           {
//             "val": "Red",
//             "key": "Color"
//           },
//           {
//             "val": "Collar",
//             "key": "Neck"
//           },
//           {
//             "key": "Sleeves",
//             "val": "Full Sleeves"
//           },
//           {
//             "val": "Hand Wash Cold Water, Dry Naturally, Do Not Iron Imprint directly, Do not Bleach.",
//             "key": "Wash Care"
//           },
//           {
//             "val": "Cotton",
//             "key": "Fabric"
//           },
//           {
//             "val": "Solid",
//             "key": "Style"
//           },
//           {
//             "val": "This model has height 6'1\",Chest 40\",Waist 31\"and is Wearing Size M.",
//             "key": "Model Stats"
//           }
//         ],
//         "info": "Look effortlessly handsome by wearing this navy blue coloured shirt from Nautica. Tailored from cotton, this shirt features trendy pockets on the front, giving it a modish look. Team this shirt with denim bottoms and loafers on an outing.",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Color",
//             "val": "Red"
//           },
//           {
//             "key": "Neck",
//             "val": "Collar"
//           },
//           {
//             "key": "Fit",
//             "val": "Slim"
//           }
//         ],
//         "name": "NauticaNavy Blue Solid Slim Fit Casual Shirt",
//         "nameLower": "nauticanavy blue solid slim fit casual shirt",
//         "sku": 70,
//         "slug": "nauticanavy-blue-solid-slim-fit-casual-shirt",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "16KNgfKYW1_m0MWQ4OhDHfUf.jpg",
//             "mrp": 3999,
//             "price": 3999,
//             "size": "S",
//             "_id": "57ce9fcde804f70584e81ccb"
//           },
//           {
//             "image": "",
//             "mrp": 3999,
//             "price": 3999,
//             "size": "M",
//             "_id": "57ce9fcde804f70584e81cca"
//           },
//           {
//             "image": "",
//             "mrp": 3999,
//             "price": 3999,
//             "size": "L",
//             "_id": "57ce9fcde804f70584e81cc9"
//           },
//           {
//             "mrp": 3999,
//             "price": 3999,
//             "size": "XL",
//             "image": "",
//             "_id": "57ce9fcde804f70584e81cc8"
//           },
//           {
//             "image": "",
//             "mrp": 3999,
//             "price": 3999,
//             "size": "XXL",
//             "_id": "57ce9fcde804f70584e81cc7"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c184b9993c5f4354000006",
//         "active": true,
//         "brand": "57c17e42993c5f81f9000004",
//         "category": "57c191c5993c5fe64d000008",
//         "features": [
//           {
//             "val": "Blended",
//             "key": "Fabric"
//           },
//           {
//             "val": "Regular",
//             "key": "Fit"
//           },
//           {
//             "val": "White",
//             "key": "Color"
//           },
//           {
//             "val": "Solid",
//             "key": "Style"
//           },
//           {
//             "val": "This model has height 6'0\",Chest 37\",Waist 34\"and is Wearing Size 32.",
//             "key": "Model Stats"
//           }
//         ],
//         "info": "Outshine among your colleagues by wearing these grey milange coloured trousers from Arrow New York. Made from poly viscose material, these trousers offer you a perfect fit and have a trendy design. Team these trousers with white shirt and shoes for a stylish look.",
//         "keyFeatures": [
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "White"
//           }
//         ],
//         "name": "Arrow New YorkGrey Milange Tapered Fit Formal Trouser",
//         "nameLower": "arrow new yorkgrey milange tapered fit formal trouser",
//         "sku": 9,
//         "slug": "arrow-new-yorkgrey-milange-tapered-fit-formal-trouser",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "DIWE3iQDN20_4z9zaDPHBGqO.jpg",
//             "mrp": 1799,
//             "price": 1799,
//             "size": "30",
//             "_id": "57cea338e804f70584e81d50"
//           },
//           {
//             "image": "lipstick-850597_640.jpg",
//             "mrp": 1799,
//             "price": 1799,
//             "size": "32",
//             "_id": "57cea338e804f70584e81d4f"
//           },
//           {
//             "image": "lipstick-850597_640.jpg",
//             "mrp": 1799,
//             "price": 1799,
//             "size": "34",
//             "_id": "57cea338e804f70584e81d4e"
//           },
//           {
//             "mrp": 1799,
//             "price": 1799,
//             "size": "36",
//             "image": "lipstick-850597_640.jpg",
//             "_id": "57cea338e804f70584e81d4d"
//           },
//           {
//             "price": 1799,
//             "size": "38",
//             "image": "lipstick-850597_640.jpg",
//             "mrp": 1799,
//             "_id": "57cea338e804f70584e81d4c"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c184d3993c5f5d54000007",
//         "active": true,
//         "brand": "5607c5c1dddfb6780c5bddf8",
//         "category": "57c1909e993c5fc13f000005",
//         "features": [
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Neck",
//             "val": "V Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Wash Care",
//             "val": "As indicated on the Label"
//           },
//           {
//             "key": "Color",
//             "val": "Orange"
//           },
//           {
//             "key": "Style",
//             "val": "Printed"
//           },
//           {
//             "val": "This model has height 5'8\",Bust 32\",Waist 27\",Hip 35\"and is Wearing Size S.",
//             "key": "Model Stats"
//           }
//         ],
//         "info": "Let your hair down and steal the spotlight by wearing this orange, printed tunic from Akkriti by Pantaloons. Made from cotton, this tunic has a V-neck and 3/4th sleeves. This regular-fit, thigh-length tunic can be teamed up with leather leggings and stilettos to complete your diva look.",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           }
//         ],
//         "name": "Akkriti By PantaloonsOrange Printed Tunic",
//         "nameLower": "akkriti by pantaloonsorange printed tunic",
//         "sku": 1,
//         "slug": "akkriti-by-pantaloonsorange-printed-tunic",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "kS9YNER3d7RyD-m3242GHPIr.jpg",
//             "mrp": 1299,
//             "price": 1299,
//             "size": "XS",
//             "_id": "57cea34ae804f70584e81d55"
//           },
//           {
//             "price": 1299,
//             "size": "S",
//             "image": "",
//             "mrp": 1299,
//             "_id": "57cea34ae804f70584e81d54"
//           },
//           {
//             "image": "",
//             "mrp": 1299,
//             "price": 1299,
//             "size": "M",
//             "_id": "57cea34ae804f70584e81d53"
//           },
//           {
//             "image": "",
//             "mrp": 1299,
//             "price": 1299,
//             "size": "L",
//             "_id": "57cea34ae804f70584e81d52"
//           },
//           {
//             "image": "",
//             "mrp": 1299,
//             "price": 1299,
//             "size": "XL",
//             "_id": "57cea34ae804f70584e81d51"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c184f2993c5f4354000007",
//         "active": true,
//         "brand": "57c17e1c993c5faed8000002",
//         "category": "57c1923a993c5fc13f00000d",
//         "features": [
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Neck",
//             "val": "Mandarin Collar"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "Red"
//           },
//           {
//             "val": "Solid",
//             "key": "Style"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 5'6\",Bust 32\",Waist 25\",Hip 35\"and is Wearing Size 8."
//           }
//         ],
//         "info": "Look graceful and serene as you make your way to your next lunch date wearing this red, half placket shirt from Dorothy Perkins. Made from polyester, this shirt has roll-up sleeves and comes in regular fit. This shirt can be teamed up with denims and stilettos to complete your stylish look.",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "Red"
//           }
//         ],
//         "name": "Dorothy PerkinsRed Non Collar Half Placket Top",
//         "nameLower": "dorothy perkinsred non collar half placket top",
//         "sku": 29,
//         "slug": "dorothy-perkinsred-non-collar-half-placket-top",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "size": "6",
//             "image": "N0qwYTCEbnT-PixxA4LlXMwq.jpg",
//             "mrp": 2290,
//             "price": 2290,
//             "_id": "57cea287e804f70584e81d30"
//           },
//           {
//             "mrp": 2290,
//             "price": 2290,
//             "size": "8",
//             "image": "guitar-944262_640.jpg",
//             "_id": "57cea287e804f70584e81d2f"
//           },
//           {
//             "price": 2290,
//             "size": "10",
//             "image": "guitar-944262_640.jpg",
//             "mrp": 2290,
//             "_id": "57cea287e804f70584e81d2e"
//           },
//           {
//             "size": "12",
//             "image": "guitar-944262_640.jpg",
//             "mrp": 2290,
//             "price": 2290,
//             "_id": "57cea287e804f70584e81d2d"
//           },
//           {
//             "mrp": 2290,
//             "price": 2290,
//             "size": "14",
//             "image": "guitar-944262_640.jpg",
//             "_id": "57cea287e804f70584e81d2c"
//           },
//           {
//             "image": "guitar-944262_640.jpg",
//             "mrp": 2290,
//             "price": 2290,
//             "size": "16",
//             "_id": "57cea287e804f70584e81d2b"
//           },
//           {
//             "price": 2290,
//             "size": "18",
//             "image": "guitar-944262_640.jpg",
//             "mrp": 2290,
//             "_id": "57cea287e804f70584e81d2a"
//           },
//           {
//             "size": "20",
//             "image": "guitar-944262_640.jpg",
//             "mrp": 2290,
//             "price": 2290,
//             "_id": "57cea287e804f70584e81d29"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18513993c5f5d54000008",
//         "active": true,
//         "brand": "57c17ecf993c5faed8000004",
//         "category": "57c198ce993c5fe64d00000c",
//         "features": [
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "val": "Rust",
//             "key": "Color"
//           },
//           {
//             "key": "Package Contents",
//             "val": "Tunic With Belt"
//           },
//           {
//             "key": "Style",
//             "val": "Printed"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 5'6\",Bust 32\",Waist 25\",Hip 35\"and is Wearing Size 8."
//           }
//         ],
//         "info": "A perfect blend of style and comfort, this rust coloured tunic by Dorothy Perkins is a must-buy. Fashioned from polyester, this regular-fit tunic will keep you at ease all day long. Team this tunic with leggings and slip-ons for a chic look.",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           }
//         ],
//         "name": "Dorothy PerkinsRust Printed Tunic With Belt",
//         "nameLower": "dorothy perkinsrust printed tunic with belt",
//         "sku": 30,
//         "slug": "dorothy-perkinsrust-printed-tunic-with-belt",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "C6IK14QwmDI55pbnx3MaAFnc.jpg",
//             "mrp": 2690,
//             "price": 2690,
//             "size": "6",
//             "_id": "57cea272e804f70584e81d28"
//           },
//           {
//             "image": "",
//             "mrp": 2690,
//             "price": 2690,
//             "size": "8",
//             "_id": "57cea272e804f70584e81d27"
//           },
//           {
//             "image": "",
//             "mrp": 2690,
//             "price": 2690,
//             "size": "10",
//             "_id": "57cea272e804f70584e81d26"
//           },
//           {
//             "size": "12",
//             "image": "",
//             "mrp": 2690,
//             "price": 2690,
//             "_id": "57cea272e804f70584e81d25"
//           },
//           {
//             "mrp": 2690,
//             "price": 2690,
//             "size": "14",
//             "image": "",
//             "_id": "57cea272e804f70584e81d24"
//           },
//           {
//             "image": "",
//             "mrp": 2690,
//             "price": 2690,
//             "size": "16",
//             "_id": "57cea272e804f70584e81d23"
//           },
//           {
//             "price": 2690,
//             "size": "18",
//             "image": "",
//             "mrp": 2690,
//             "_id": "57cea272e804f70584e81d22"
//           },
//           {
//             "size": "20",
//             "image": "",
//             "mrp": 2690,
//             "price": 2690,
//             "_id": "57cea272e804f70584e81d21"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18531993c5f4354000008",
//         "active": true,
//         "brand": "57c17eec993c5f81f9000006",
//         "category": "57c19938993c5fc13f000011",
//         "features": [
//           {
//             "key": "Type",
//             "val": "Blouses"
//           },
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "White"
//           },
//           {
//             "key": "Style",
//             "val": "Embroidered"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 5'6\",Bust 33\",Waist 30\",Hip 36\"and is Wearing Size 8."
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Type",
//             "val": "Blouses"
//           },
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "White"
//           }
//         ],
//         "name": "Dorothy PerkinsWhite Embroidered Blouse",
//         "nameLower": "dorothy perkinswhite embroidered blouse",
//         "sku": 31,
//         "slug": "dorothy-perkinswhite-embroidered-blouse",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "Ttc_9o-wszooYmre0blxfbr3.jpg",
//             "mrp": 3690,
//             "price": 3690,
//             "size": "6",
//             "_id": "57cea261e804f70584e81d20"
//           },
//           {
//             "image": "handsome-885096_640.jpg",
//             "mrp": 3690,
//             "price": 3690,
//             "size": "8",
//             "_id": "57cea261e804f70584e81d1f"
//           },
//           {
//             "size": "10",
//             "image": "handsome-885096_640.jpg",
//             "mrp": 3690,
//             "price": 3690,
//             "_id": "57cea261e804f70584e81d1e"
//           },
//           {
//             "mrp": 3690,
//             "price": 3690,
//             "size": "12",
//             "image": "handsome-885096_640.jpg",
//             "_id": "57cea261e804f70584e81d1d"
//           },
//           {
//             "price": 3690,
//             "size": "14",
//             "image": "handsome-885096_640.jpg",
//             "mrp": 3690,
//             "_id": "57cea261e804f70584e81d1c"
//           },
//           {
//             "image": "handsome-885096_640.jpg",
//             "mrp": 3690,
//             "price": 3690,
//             "size": "16",
//             "_id": "57cea261e804f70584e81d1b"
//           },
//           {
//             "image": "handsome-885096_640.jpg",
//             "mrp": 3690,
//             "price": 3690,
//             "size": "18",
//             "_id": "57cea261e804f70584e81d1a"
//           },
//           {
//             "mrp": 3690,
//             "price": 3690,
//             "size": "20",
//             "image": "handsome-885096_640.jpg",
//             "_id": "57cea261e804f70584e81d19"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18558993c5f5d54000009",
//         "active": true,
//         "brand": "57c17e6e993c5faed8000003",
//         "category": "57c198ce993c5fe64d00000c",
//         "features": [
//           {
//             "val": "Blouses",
//             "key": "Type"
//           },
//           {
//             "val": "Polyester",
//             "key": "Fabric"
//           },
//           {
//             "val": "Waist Length",
//             "key": "Length"
//           },
//           {
//             "val": "Cap Sleeves",
//             "key": "Sleeves"
//           },
//           {
//             "val": "Round Neck",
//             "key": "Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "val": "Machine Wash",
//             "key": "Wash Care"
//           },
//           {
//             "val": "Green",
//             "key": "Color"
//           },
//           {
//             "val": "Printed",
//             "key": "Style"
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Type",
//             "val": "Blouses"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "Green"
//           }
//         ],
//         "name": "FaballeyPurple Printed Blouse",
//         "nameLower": "faballeypurple printed blouse",
//         "sku": 34,
//         "slug": "faballeypurple-printed-blouse",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "-PfYR4ydCwb_uIUobGtcOb48.jpg",
//             "mrp": 660,
//             "price": 660,
//             "size": "S",
//             "_id": "57cea24fe804f70584e81d18"
//           },
//           {
//             "image": "",
//             "mrp": 660,
//             "price": 660,
//             "size": "M",
//             "_id": "57cea24fe804f70584e81d17"
//           },
//           {
//             "image": "",
//             "mrp": 660,
//             "price": 660,
//             "size": "L",
//             "_id": "57cea24fe804f70584e81d16"
//           },
//           {
//             "image": "",
//             "mrp": 660,
//             "price": 660,
//             "size": "XL",
//             "_id": "57cea24fe804f70584e81d15"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18572993c5f4354000009",
//         "active": true,
//         "brand": "57c17e42993c5f81f9000004",
//         "category": "57c19189993c5fc13f000009",
//         "features": [
//           {
//             "key": "Type",
//             "val": "Long coats"
//           },
//           {
//             "key": "Fabric",
//             "val": "TWEED"
//           },
//           {
//             "key": "Sleeves",
//             "val": "Full Sleeves"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Wash Care",
//             "val": "Dark colours to be washed separately"
//           },
//           {
//             "key": "Color",
//             "val": "Black"
//           },
//           {
//             "key": "Style",
//             "val": "Solid"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 5'9\",Bust 35\",Waist 27\",Hip 36\"and is Wearing Size M."
//           }
//         ],
//         "info": "Raise the temperature of cool evenings this winter, wearing this black coloured long coat from Fort Collins. Crafted from tweed, this coat is high on style quotient. Pair this coat with your favourite bottoms and tan coloured boots for a chic look. ",
//         "keyFeatures": [
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           }
//         ],
//         "name": "Fort CollinsBlack Solid Long Coat",
//         "nameLower": "fort collinsblack solid long coat",
//         "sku": 35,
//         "slug": "fort-collinsblack-solid-long-coat",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "SQUkzlVVSs0qObd2XBcz_tZa.jpg",
//             "mrp": 2975,
//             "price": 2975,
//             "size": "M",
//             "_id": "57cea22be804f70584e81d0f"
//           },
//           {
//             "image": "",
//             "mrp": 2975,
//             "price": 2975,
//             "size": "L",
//             "_id": "57cea22be804f70584e81d0e"
//           },
//           {
//             "image": "",
//             "mrp": 2975,
//             "price": 2975,
//             "size": "XL",
//             "_id": "57cea22be804f70584e81d0d"
//           },
//           {
//             "image": "",
//             "mrp": 2975,
//             "price": 2975,
//             "size": "XXL",
//             "_id": "57cea22be804f70584e81d0c"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c1858a993c5f5d5400000a",
//         "active": true,
//         "brand": "57c17d4c993c5f81f9000001",
//         "category": "57c1923a993c5fc13f00000d",
//         "features": [
//           {
//             "val": "Cotton",
//             "key": "Fabric"
//           },
//           {
//             "val": "3/4th Sleeves",
//             "key": "Sleeves"
//           },
//           {
//             "val": "Round Neck",
//             "key": "Neck"
//           },
//           {
//             "val": "Regular",
//             "key": "Fit"
//           },
//           {
//             "val": "Handwash Separately In Cold Water Use Mild Detergr Dry In Shadeent Do Not Soak / Wring Dry Immediately After Wash",
//             "key": "Wash Care"
//           },
//           {
//             "val": "White",
//             "key": "Color"
//           },
//           {
//             "key": "Style",
//             "val": "Printed"
//           },
//           {
//             "val": "This model has height 5'7\",Bust 33\",Waist 29\",Hip 37\"and is Wearing Size S.",
//             "key": "Model Stats"
//           }
//         ],
//         "info": "A perfect fusion of traditional and contemporary style, this orange coloured tunic from Global Desi will be a classy addition to your closet. Fashioned from linen, this regular-fit tunic will keep you at ease all day long. Team this tunic with leggings and slip-ons for a graceful look.",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "White"
//           }
//         ],
//         "name": "Global DesiOrange Printed Tunic",
//         "nameLower": "global desiorange printed tunic",
//         "sku": 37,
//         "slug": "global-desiorange-printed-tunic",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "size": "XS",
//             "image": "Wbl-Ry9brtRVxFV7mJ_OIn2u.jpg",
//             "mrp": 1599,
//             "price": 1599,
//             "_id": "57cea0b6e804f70584e81cf4"
//           },
//           {
//             "mrp": 1599,
//             "price": 1599,
//             "size": "S",
//             "image": "lady-in-red-912366_640.jpg",
//             "_id": "57cea0b6e804f70584e81cf3"
//           },
//           {
//             "price": 1599,
//             "size": "M",
//             "image": "lady-in-red-912366_640.jpg",
//             "mrp": 1599,
//             "_id": "57cea0b6e804f70584e81cf2"
//           },
//           {
//             "size": "L",
//             "image": "lady-in-red-912366_640.jpg",
//             "mrp": 1599,
//             "price": 1599,
//             "_id": "57cea0b6e804f70584e81cf1"
//           },
//           {
//             "image": "lady-in-red-912366_640.jpg",
//             "mrp": 1599,
//             "price": 1599,
//             "size": "XL",
//             "_id": "57cea0b6e804f70584e81cf0"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c185a7993c5f435400000a",
//         "active": true,
//         "brand": "5607c58bdddfb6780c5bddf3",
//         "category": "57c1924f993c5fe64d00000b",
//         "features": [
//           {
//             "val": "Jackets",
//             "key": "Type"
//           },
//           {
//             "val": "Collar",
//             "key": "Neck"
//           },
//           {
//             "val": "Red",
//             "key": "Color"
//           },
//           {
//             "val": "Polyurethane",
//             "key": "Fabric Details"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 5'6\",Bust 32\",Waist 25\",Hip 35\"and is Wearing Size S."
//           }
//         ],
//         "info": "Get a classic biker look wearing this jacket for women by Lara Karen. This PU (polyurethane) jacket will ensure a comfortable fit. Team this jacket with jeans and high heels while heading for a weekend outing. ",
//         "keyFeatures": [
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Neck",
//             "val": "Collar"
//           },
//           {
//             "key": "Color",
//             "val": "Red"
//           }
//         ],
//         "name": "Lara KarenBLACK WINTER JACKET",
//         "nameLower": "lara karenblack winter jacket",
//         "sku": 47,
//         "slug": "lara-karenblack-winter-jacket",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "price": 3999,
//             "size": "S",
//             "image": "DIWE3iQDN20_4z9zaDPHBGqO.jpg",
//             "mrp": 3999,
//             "_id": "57cea0a3e804f70584e81cef"
//           },
//           {
//             "size": "M",
//             "image": "bella-kukan-906524_640.jpg",
//             "mrp": 3999,
//             "price": 3999,
//             "_id": "57cea0a3e804f70584e81cee"
//           },
//           {
//             "mrp": 3999,
//             "price": 3999,
//             "size": "L",
//             "image": "bella-kukan-906524_640.jpg",
//             "_id": "57cea0a3e804f70584e81ced"
//           },
//           {
//             "price": 3999,
//             "size": "XL",
//             "image": "bella-kukan-906524_640.jpg",
//             "mrp": 3999,
//             "_id": "57cea0a3e804f70584e81cec"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c185c1993c5f5d5400000b",
//         "active": true,
//         "brand": "57c17a41993c5f81f9000000",
//         "category": "57c198f5993c5fe64d00000d",
//         "features": [
//           {
//             "key": "Type",
//             "val": "Gown"
//           },
//           {
//             "val": "Round Neck",
//             "key": "Neck"
//           },
//           {
//             "val": "Regular",
//             "key": "Fit"
//           },
//           {
//             "val": "Red",
//             "key": "Color"
//           },
//           {
//             "val": "Poly Georgette",
//             "key": "Fabric Details"
//           },
//           {
//             "val": "This model has height 5'7\",Bust 32\",Waist 29\",Hip 35\"and is Wearing Size S.",
//             "key": "Model Stats"
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Color",
//             "val": "Red"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           }
//         ],
//         "name": "Lara KarenOff White Dresses",
//         "nameLower": "lara karenoff white dresses",
//         "sku": 51,
//         "slug": "lara-karenoff-white-dresses",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "size": "S",
//             "image": "q_YaGxfFSoalAmDHxIoL5rVy.jpg",
//             "mrp": 2299,
//             "price": 2299,
//             "_id": "57cea08be804f70584e81ceb"
//           },
//           {
//             "image": "",
//             "mrp": 2299,
//             "price": 2299,
//             "size": "M",
//             "_id": "57cea08be804f70584e81cea"
//           },
//           {
//             "size": "L",
//             "image": "",
//             "mrp": 2299,
//             "price": 2299,
//             "_id": "57cea08be804f70584e81ce9"
//           },
//           {
//             "mrp": 2299,
//             "price": 2299,
//             "size": "XL",
//             "image": "",
//             "_id": "57cea08be804f70584e81ce8"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c185df993c5f435400000b",
//         "active": true,
//         "brand": "57c17eec993c5f81f9000006",
//         "category": "57c19125993c5fe64d000005",
//         "features": [
//           {
//             "val": "Polyester",
//             "key": "Fabric"
//           },
//           {
//             "val": "Skinny",
//             "key": "Fit"
//           },
//           {
//             "val": "Dark Colours To Be Washed Separately",
//             "key": "Wash Care"
//           },
//           {
//             "val": "Blue",
//             "key": "Color"
//           },
//           {
//             "val": "Washed",
//             "key": "Style"
//           },
//           {
//             "val": "This model has height 5'8\",Bust 32\",Waist 29\",Hip 33\"and is Wearing Size 28.",
//             "key": "Model Stats"
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "LeeBlue Mid Rise Skinny Jeans",
//         "nameLower": "leeblue mid rise skinny jeans",
//         "sku": 54,
//         "slug": "leeblue-mid-rise-skinny-jeans",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "G8zyaeeFHhZ4f3Sit9baKJcz.jpg",
//             "mrp": 3599,
//             "price": 3599,
//             "size": "26",
//             "_id": "57cea039e804f70584e81cdd"
//           },
//           {
//             "image": "",
//             "mrp": 3599,
//             "price": 3599,
//             "size": "28",
//             "_id": "57cea039e804f70584e81cdc"
//           },
//           {
//             "image": "",
//             "mrp": 3599,
//             "price": 3599,
//             "size": "30",
//             "_id": "57cea039e804f70584e81cdb"
//           },
//           {
//             "size": "32",
//             "image": "",
//             "mrp": 3599,
//             "price": 3599,
//             "_id": "57cea039e804f70584e81cda"
//           },
//           {
//             "image": "",
//             "mrp": 3599,
//             "price": 3599,
//             "size": "34",
//             "_id": "57cea039e804f70584e81cd9"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c185f8993c5f5d5400000c",
//         "active": true,
//         "brand": "57c17e1c993c5faed8000002",
//         "category": "57c1923a993c5fc13f00000d",
//         "features": [
//           {
//             "key": "Type",
//             "val": "Shift Dresses"
//           },
//           {
//             "key": "Fabric",
//             "val": "100% Viscose"
//           },
//           {
//             "val": "Round Neck",
//             "key": "Neck"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Wash Care",
//             "val": "GENTLE WASH"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           },
//           {
//             "key": "Package Contents",
//             "val": "Dress Leather Belt"
//           },
//           {
//             "val": "Solid",
//             "key": "Style"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 5'7\",Bust 32\",Waist 29\",Hip 35\"and is Wearing Size S."
//           }
//         ],
//         "info": "Make a distinct style statement wearing this navy blue coloured dress from MANGO. A must-have for fashionable women, this short dress features trendy sleeves and back. This short dress is made from 100% viscose and features regular fit.",
//         "keyFeatures": [
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "MangoBlue Solid Shift Dress With Belt",
//         "nameLower": "mangoblue solid shift dress with belt",
//         "sku": 55,
//         "slug": "mangoblue-solid-shift-dress-with-belt",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "kS9YNER3d7RyD-m3242GHPIr.jpg",
//             "mrp": 3490,
//             "price": 3490,
//             "size": "XS",
//             "_id": "57ce9ff4e804f70584e81cd4"
//           },
//           {
//             "image": "male-419947_640.jpg",
//             "mrp": 3490,
//             "price": 3490,
//             "size": "S",
//             "_id": "57ce9ff4e804f70584e81cd3"
//           },
//           {
//             "mrp": 3490,
//             "price": 3490,
//             "size": "M",
//             "image": "male-419947_640.jpg",
//             "_id": "57ce9ff4e804f70584e81cd2"
//           },
//           {
//             "price": 3490,
//             "size": "L",
//             "image": "male-419947_640.jpg",
//             "mrp": 3490,
//             "_id": "57ce9ff4e804f70584e81cd1"
//           },
//           {
//             "size": "XL",
//             "image": "male-419947_640.jpg",
//             "mrp": 3490,
//             "price": 3490,
//             "_id": "57ce9ff4e804f70584e81cd0"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18612993c5f435400000c",
//         "active": true,
//         "brand": "5607c599dddfb6780c5bddf4",
//         "category": "57c198f5993c5fe64d00000d",
//         "features": [
//           {
//             "key": "Type",
//             "val": "Blouses"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Neck",
//             "val": "Collar"
//           },
//           {
//             "key": "Fit",
//             "val": "Loose"
//           },
//           {
//             "val": "Blue",
//             "key": "Color"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 5'6\",Bust 32\",Waist 25\",Hip 35\"and is Wearing Size S."
//           }
//         ],
//         "info": "Blue loose top",
//         "keyFeatures": [
//           {
//             "val": "Blouses",
//             "key": "Type"
//           },
//           {
//             "key": "Fit",
//             "val": "Loose"
//           },
//           {
//             "key": "Neck",
//             "val": "Collar"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "Miss Bennett LondonStripe Patch Pocket Shirt",
//         "nameLower": "miss bennett londonstripe patch pocket shirt",
//         "sku": 65,
//         "slug": "miss-bennett-londonstripe-patch-pocket-shirt",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "size": "S",
//             "image": "qygr4Qp2ATz5TpBqOLSkYpJa.jpg",
//             "mrp": 1299,
//             "price": 1299,
//             "_id": "57ce9fe0e804f70584e81ccf"
//           },
//           {
//             "mrp": 1299,
//             "price": 1299,
//             "size": "M",
//             "image": "male-668140_640.jpg",
//             "_id": "57ce9fe0e804f70584e81cce"
//           },
//           {
//             "price": 1299,
//             "size": "L",
//             "image": "male-668140_640.jpg",
//             "mrp": 1299,
//             "_id": "57ce9fe0e804f70584e81ccd"
//           },
//           {
//             "image": "male-668140_640.jpg",
//             "mrp": 1299,
//             "price": 1299,
//             "size": "XL",
//             "_id": "57ce9fe0e804f70584e81ccc"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18629993c5f5d5400000d",
//         "active": true,
//         "brand": "5607c5c1dddfb6780c5bddf8",
//         "category": "57c190f7993c5fe64d000004",
//         "features": [
//           {
//             "val": "Polyester",
//             "key": "Fabric"
//           },
//           {
//             "val": "Regular",
//             "key": "Fit"
//           },
//           {
//             "val": "Black",
//             "key": "Color"
//           },
//           {
//             "val": "Solid",
//             "key": "Style"
//           },
//           {
//             "val": "This model has height 5'7\",Bust 32\",Waist 30\",Hip 34\"and is Wearing Size 28.",
//             "key": "Model Stats"
//           }
//         ],
//         "info": "Establish yourself as the new fashionista by wearing these black jeans from Pepe Jeans. Made from polycotton spandex, these jeans have a drawstring and come in regular fit. These jeans can be teamed up with a crop top and sneakers to complete your stylish look.",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Color",
//             "val": "White"
//           }
//         ],
//         "name": "Pepe JeansBlack Solid Jeans",
//         "nameLower": "pepe jeansblack solid jeans",
//         "sku": 68,
//         "slug": "pepe-jeansblack-solid-jeans",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "k1d2xPL3IqtRVRoU6KbKAUzo.jpg",
//             "mrp": 2799,
//             "price": 2799,
//             "size": "26",
//             "_id": "57ce9fb6e804f70584e81cc6"
//           },
//           {
//             "image": "",
//             "mrp": 2799,
//             "price": 2799,
//             "size": "28",
//             "_id": "57ce9fb6e804f70584e81cc5"
//           },
//           {
//             "image": "",
//             "mrp": 2799,
//             "price": 2799,
//             "size": "30",
//             "_id": "57ce9fb6e804f70584e81cc4"
//           },
//           {
//             "image": "",
//             "mrp": 2799,
//             "price": 2799,
//             "size": "32",
//             "_id": "57ce9fb6e804f70584e81cc3"
//           },
//           {
//             "size": "34",
//             "image": "",
//             "mrp": 2799,
//             "price": 2799,
//             "_id": "57ce9fb6e804f70584e81cc2"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18641993c5f435400000d",
//         "active": true,
//         "brand": "57c17e42993c5f81f9000004",
//         "category": "57c1923a993c5fc13f00000d",
//         "features": [
//           {
//             "val": "Anarkali",
//             "key": "Type"
//           },
//           {
//             "val": "Polyester",
//             "key": "Fabric"
//           },
//           {
//             "val": "Round Neck",
//             "key": "Neck"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           },
//           {
//             "val": "Cotton",
//             "key": "Fabric Details"
//           },
//           {
//             "val": "This model has height 5'8\",Bust 32\",Waist 27\",Hip 35\"and is Wearing Size S.",
//             "key": "Model Stats"
//           }
//         ],
//         "info": "Be the talk of the town by wearing this blue coloured Anarkali from Sangria. Crafted from cotton, this Anarkali features magnificent print and embroidered placket. Team this Anarkali with contrasting churidar and golden jhumkis for a lovely look.",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Color",
//             "val": "Blue"
//           }
//         ],
//         "name": "SangriaBorder Printed Tier Kurta With Solid Embroidered Yoke And 3/4Th Sleeves",
//         "nameLower": "sangriaborder printed tier kurta with solid embroidered yoke and 3/4th sleeves",
//         "sku": 72,
//         "slug": "sangriaborder-printed-tier-kurta-with-solid-embroidered-yoke-and-34th-sleeves",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "NJB_V7Rmpvf3ULzx5WXgm5zq.jpg",
//             "mrp": 1999,
//             "price": 1999,
//             "size": "XS",
//             "_id": "57ce9f99e804f70584e81cc1"
//           },
//           {
//             "image": "model-858751_640.jpg",
//             "mrp": 1999,
//             "price": 1999,
//             "size": "S",
//             "_id": "57ce9f99e804f70584e81cc0"
//           },
//           {
//             "image": "model-858751_640.jpg",
//             "mrp": 1999,
//             "price": 1999,
//             "size": "M",
//             "_id": "57ce9f99e804f70584e81cbf"
//           },
//           {
//             "mrp": 1999,
//             "price": 1999,
//             "size": "L",
//             "image": "model-858751_640.jpg",
//             "_id": "57ce9f99e804f70584e81cbe"
//           },
//           {
//             "price": 1999,
//             "size": "XL",
//             "image": "model-858751_640.jpg",
//             "mrp": 1999,
//             "_id": "57ce9f99e804f70584e81cbd"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18657993c5f5d5400000e",
//         "active": true,
//         "brand": "5607c5c1dddfb6780c5bddf8",
//         "category": "57c191c5993c5fe64d000008",
//         "features": [
//           {
//             "key": "Fit",
//             "val": "Slim"
//           },
//           {
//             "key": "Color",
//             "val": "Navy Blue"
//           },
//           {
//             "key": "Neck",
//             "val": "COLLAR"
//           },
//           {
//             "key": "Sleeves",
//             "val": "Full Sleeves"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Style",
//             "val": "Printed"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 6'0\",Chest 37\",Waist 34\"and is Wearing Size 40."
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Fit",
//             "val": "Slim"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           }
//         ],
//         "name": "ArrowNavy Blue Slim Fit Formal Shirt",
//         "nameLower": "arrownavy blue slim fit formal shirt",
//         "sku": 7,
//         "slug": "arrownavy-blue-slim-fit-formal-shirt",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "rvkIKygkUeZ3Zr8YNo7jxPPA.jpg",
//             "mrp": 1799,
//             "price": 1799,
//             "size": "39",
//             "_id": "57cea2fae804f70584e81d46"
//           },
//           {
//             "image": "",
//             "mrp": 1799,
//             "price": 1799,
//             "size": "40",
//             "_id": "57cea2fae804f70584e81d45"
//           },
//           {
//             "image": "",
//             "mrp": 1799,
//             "price": 1799,
//             "size": "42",
//             "_id": "57cea2fae804f70584e81d44"
//           },
//           {
//             "image": "",
//             "mrp": 1799,
//             "price": 1799,
//             "size": "44",
//             "_id": "57cea2fae804f70584e81d43"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18671993c5f435400000e",
//         "active": true,
//         "brand": "5607c5c1dddfb6780c5bddf8",
//         "category": "57c1910d993c5fc13f000007",
//         "features": [
//           {
//             "key": "Type",
//             "val": "A-line"
//           },
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Fit",
//             "val": "Regular"
//           },
//           {
//             "key": "Wash Care",
//             "val": "Machine wash"
//           },
//           {
//             "val": "Light Blue",
//             "key": "Color"
//           },
//           {
//             "key": "Style",
//             "val": "Solid"
//           }
//         ],
//         "info": "",
//         "keyFeatures": [

//         ],
//         "name": "TOPSHOPChevron Pleat A Line Skirt",
//         "nameLower": "topshopchevron pleat a line skirt",
//         "sku": 81,
//         "slug": "topshopchevron-pleat-a-line-skirt",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "price": 5190,
//             "size": "6",
//             "image": "Qq8ktx4drI4WnY3FKvg0Ic7V.jpg",
//             "mrp": 5190,
//             "_id": "57ce9f43e804f70584e81cb7"
//           },
//           {
//             "image": "",
//             "mrp": 5190,
//             "price": 5190,
//             "size": "8",
//             "_id": "57ce9f43e804f70584e81cb6"
//           },
//           {
//             "image": "",
//             "mrp": 5190,
//             "price": 5190,
//             "size": "10",
//             "_id": "57ce9f43e804f70584e81cb5"
//           },
//           {
//             "image": "",
//             "mrp": 5190,
//             "price": 5190,
//             "size": "12",
//             "_id": "57ce9f43e804f70584e81cb4"
//           },
//           {
//             "image": "",
//             "mrp": 5190,
//             "price": 5190,
//             "size": "14",
//             "_id": "57ce9f43e804f70584e81cb3"
//           },
//           {
//             "mrp": 5190,
//             "price": 5190,
//             "size": "16",
//             "image": "",
//             "_id": "57ce9f43e804f70584e81cb2"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c18689993c5f5d5400000f",
//         "active": true,
//         "brand": "57c17a41993c5f81f9000000",
//         "category": "57c198f5993c5fe64d00000d",
//         "features": [
//           {
//             "val": "Cotton",
//             "key": "Fabric"
//           },
//           {
//             "val": "POLY VISCOSE ELASTANE",
//             "key": "Fabric"
//           },
//           {
//             "val": "Collar",
//             "key": "Neck"
//           },
//           {
//             "val": "Regular",
//             "key": "Fit"
//           },
//           {
//             "key": "Wash Care",
//             "val": "Dry clean only"
//           },
//           {
//             "val": "Light Grey",
//             "key": "Color"
//           },
//           {
//             "val": "Solid",
//             "key": "Style"
//           }
//         ],
//         "info": "",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Cotton"
//           },
//           {
//             "key": "Neck",
//             "val": "Collar"
//           }
//         ],
//         "name": "TOPSHOPHolly Sleeveless Jacket",
//         "nameLower": "topshopholly sleeveless jacket",
//         "sku": 86,
//         "slug": "topshopholly-sleeveless-jacket",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "size": "6",
//             "image": "xk4U_viiWUKhRtyB-WZzcmxT.jpg",
//             "mrp": 5190,
//             "price": 5190,
//             "_id": "57ce9f2ce804f70584e81cb1"
//           },
//           {
//             "image": "women-939996_640.jpg",
//             "mrp": 5190,
//             "price": 5190,
//             "size": "8",
//             "_id": "57ce9f2ce804f70584e81cb0"
//           },
//           {
//             "size": "10",
//             "image": "women-939996_640.jpg",
//             "mrp": 5190,
//             "price": 5190,
//             "_id": "57ce9f2ce804f70584e81caf"
//           },
//           {
//             "image": "women-939996_640.jpg",
//             "mrp": 5190,
//             "price": 5190,
//             "size": "12",
//             "_id": "57ce9f2ce804f70584e81cae"
//           },
//           {
//             "size": "14",
//             "image": "women-939996_640.jpg",
//             "mrp": 5190,
//             "price": 5190,
//             "_id": "57ce9f2ce804f70584e81cad"
//           },
//           {
//             "mrp": 5190,
//             "price": 5190,
//             "size": "16",
//             "image": "women-939996_640.jpg",
//             "_id": "57ce9f2ce804f70584e81cac"
//           }
//         ]
//       },
//       {
//         "__v": 1,
//         "_id": "57c186a2993c5f435400000f",
//         "active": true,
//         "brand": "57c17a41993c5f81f9000000",
//         "category": "57c191da993c5fc13f00000b",
//         "features": [
//           {
//             "key": "Type",
//             "val": "Chinos"
//           },
//           {
//             "key": "Fabric",
//             "val": "Cotton Spandex (Stretchable)"
//           },
//           {
//             "val": "Regular",
//             "key": "Fit"
//           },
//           {
//             "key": "Color",
//             "val": "Red"
//           },
//           {
//             "key": "Style",
//             "val": "Solid"
//           },
//           {
//             "key": "Model Stats",
//             "val": "This model has height 5'6\",Bust 32\",Waist 25\",Hip 35\"and is Wearing Size 28."
//           }
//         ],
//         "info": "Get a head-turning look wearing these red coloured chinos from United Colors of Benetton. Made from cotton spandex, these chinos stay extremely soft against the skin. Featuring a flawless finish, these chinos can be worn with a top of your choice for a modish look. ",
//         "keyFeatures": [
//           {
//             "key": "Fabric",
//             "val": "Polyester"
//           },
//           {
//             "key": "Fit",
//             "val": "Loose"
//           },
//           {
//             "key": "Neck",
//             "val": "Round Neck"
//           },
//           {
//             "key": "Color",
//             "val": "Green"
//           }
//         ],
//         "name": "United Colors of BenettonRed Solid Chinos",
//         "nameLower": "united colors of benettonred solid chinos",
//         "sku": 98,
//         "slug": "united-colors-of-benettonred-solid-chinos",
//         "type": "Men",
//         "uid": "blitz@sportscenter.com",
//         "variants": [
//           {
//             "image": "kMA-9tjsHRuo5dBYms8jvXuQ.jpg",
//             "mrp": 2499,
//             "price": 2499,
//             "size": "24",
//             "_id": "57ce9f16e804f70584e81cab"
//           },
//           {
//             "image": "model-881432_640.jpg",
//             "mrp": 2499,
//             "price": 2499,
//             "size": "26",
//             "_id": "57ce9f16e804f70584e81caa"
//           },
//           {
//             "image": "model-881432_640.jpg",
//             "mrp": 2499,
//             "price": 2499,
//             "size": "28",
//             "_id": "57ce9f16e804f70584e81ca9"
//           },
//           {
//             "mrp": 2499,
//             "price": 2499,
//             "size": "30",
//             "image": "model-881432_640.jpg",
//             "_id": "57ce9f16e804f70584e81ca8"
//           },
//           {
//             "image": "model-881432_640.jpg",
//             "mrp": 2499,
//             "price": 2499,
//             "size": "32",
//             "_id": "57ce9f16e804f70584e81ca7"
//           },
//           {
//             "image": "model-881432_640.jpg",
//             "mrp": 2499,
//             "price": 2499,
//             "size": "34",
//             "_id": "57ce9f16e804f70584e81ca6"
//           }
//         ]
//       }, function () {
//         Product.find({}, function (err, data) { data.forEach(data => { data.save() }); })
//         console.log('finished populating products');
//       });
//   }
// });

// Category.find(function (err, data) {
//   if (data.length < 1) {
//     Category.create(
//       {
//         "_id": "57c1901f993c5fc13f000003",
//         "__v": 0,
//         "name": "Men",
//         "slug": "men",
//         "parentID" :null,
//         "isglobal" :true,
//         "uid": "blitz@sportscenter.com",
//         "children": [
//           {
//             "_id": "57c1904f993c5fe64d000001",
//             "name": "Pants",
//             "slug": "dresses",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c198e2993c5fc13f00000f",
//             "name": "Shirts",
//             "slug": "shirts",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c19208993c5fc13f00000c",
//             "name": "Suits & Blazers",
//             "slug": "suits-blazers",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c191c5993c5fe64d000008",
//             "name": "Track Wear",
//             "slug": "track-wear",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c191da993c5fc13f00000b",
//             "name": "Casual Trousers",
//             "slug": "casual-trousers",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c191f2993c5fe64d000009",
//             "name": "Shorts & 3/4ths",
//             "slug": "shorts-34ths",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c19150993c5fe64d000006",
//             "name": "Casual Shirts",
//             "slug": "casual-shirts",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c1913a993c5fc13f000008",
//             "name": "Polo & Tees",
//             "slug": "polo-tees",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c19189993c5fc13f000009",
//             "name": "Winter Wear",
//             "slug": "winter-wear",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c1919a993c5fe64d000007",
//             "name": "Formal Shirts",
//             "slug": "formal-shirts",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c190f7993c5fe64d000004",
//             "name": "Jeans",
//             "slug": "jeans",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57cebfcee804f70584e81d56",
//             "name": "Pants",
//             "slug": "pants",
//             "active": true,
//           },
//           {
//             "_id": "57c190df993c5fc13f000006",
//             "name": "Trousers",
//             "slug": "trousers",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           }
//         ],
//         "active": true,
//       },

//       {
//         "_id": "57c19222993c5fe64d00000a",
//         "__v": 0,
//         "name": "Women",
//         "slug": "women",
//         "uid": "admin@sportscenter.com",
//         "parentID" :null,
//         "isglobal" :true,
//         "children": [
//           {
//             "_id": "57c198f5993c5fe64d00000d",
//             "name": "Dresses",
//             "slug": "dresses",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c1923a993c5fc13f00000d",
//             "name": "Tunics",
//             "slug": "tunics",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c198ce993c5fe64d00000c",
//             "name": "Western",
//             "slug": "tops",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c1910d993c5fc13f000007",
//             "name": "Skirts",
//             "slug": "skirts",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c19125993c5fe64d000005",
//             "name": "Leggings & Jeggings",
//             "slug": "leggings-jeggings",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c198bb993c5fc13f00000e",
//             "name": "Tops",
//             "slug": "tops",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c19938993c5fc13f000011",
//             "name": "Ethnic",
//             "slug": "tunics",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c19929993c5fe64d00000e",
//             "name": "Jeans",
//             "slug": "jeans",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c1924f993c5fe64d00000b",
//             "name": "Winter",
//             "slug": "women",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c191b2993c5fc13f00000a",
//             "name": "Denims",
//             "slug": "denims",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c1909e993c5fc13f000005",
//             "name": "Shirts",
//             "slug": "shirts",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           },
//           {
//             "_id": "57c1907a993c5fe64d000002",
//             "name": "Tees",
//             "slug": "tees",
//             "uid": "admin@sportscenter.com",
//             "active": true,
//           }
//         ],
//         "active": true,
//       }, function () {
//         Category.find({}, function (err, data) { data.forEach(data => { data.save() }); })
//         console.log('finished populating categories');
//       });
//   }
// });

Brand.find(function (err, data) {
  if (data.length < 1) {
    Brand.create({
      "_id": "5607c58bdddfb6780c5bddf3",
      "name": "Estelle",
      "info": "Estelle",
      "slug": "estelle",
      "__v": 0,
      "active": true
    },
      {
        "_id": "5607c599dddfb6780c5bddf4",
        "name": "FREECULTR",
        "info": "FREECULTR",
        "slug": "freecultr",
        "__v": 0,
        "active": true
      },
      {
        "__v": 0,
        "slug": "alleviater",
        "info": "Alleviater",
        "name": "Alleviater",
        "_id": "5607c5c1dddfb6780c5bddf8",
        "active": true
      },
      {
        "_id": "57c17a41993c5f81f9000000",
        "__v": 0,
        "brand": 10,
        "active": true,
        "info": "Li-Ning",
        "name": "Li-Ning",
        "slug": "li-ning",
        "uid": "blitz@sportscenter.com"
      },
      {
        "_id": "57c17d4c993c5f81f9000001",
        "__v": 0,
        "active": true,
        "info": "Knotty Derby",
        "name": "Knotty Derby",
        "slug": "knotty-derby",
        "uid": "admin@sportscenter.com",
        "brand": 70
      },
      {
        "_id": "57c17d83993c5faed8000000",
        "__v": 0,
        "active": true,
        "info": "J Collection",
        "name": "J Collection",
        "slug": "j-collection",
        "uid": "admin@sportscenter.com",
        "brand": 90
      },
      {
        "_id": "57c17dab993c5f81f9000002",
        "__v": 0,
        "active": true,
        "info": "Inc.5",
        "name": "Inc.5",
        "slug": "inc5",
        "uid": "admin@sportscenter.com",
        "brand": 100
      },
      {
        "_id": "57c17dce993c5faed8000001",
        "__v": 0,
        "active": true,
        "info": "Garfield",
        "name": "Garfield",
        "slug": "garfield",
        "uid": "admin@sportscenter.com",
        "brand": 120
      },
      {
        "_id": "57c17df7993c5f81f9000003",
        "__v": 0,
        "active": true,
        "info": "Happy Feet",
        "name": "Happy Feet",
        "slug": "happy-feet",
        "uid": "admin@sportscenter.com",
        "brand": 110
      },
      {
        "_id": "57c17e1c993c5faed8000002",
        "__v": 0,
        "active": true,
        "info": "John Jacobs",
        "name": "John Jacobs",
        "slug": "john-jacobs",
        "uid": "admin@sportscenter.com",
        "brand": 80
      },
      {
        "_id": "57c17e42993c5f81f9000004",
        "__v": 0,
        "active": true,
        "info": "Melange",
        "name": "Melange",
        "slug": "melange",
        "uid": "admin@sportscenter.com",
        "brand": 40
      },
      {
        "_id": "57c17e6e993c5faed8000003",
        "__v": 0,
        "active": true,
        "info": "Phosphorus",
        "name": "Phosphorus",
        "slug": "phosphorus",
        "uid": "admin@sportscenter.com",
        "brand": 20
      },
      {
        "_id": "57c17e9f993c5f81f9000005",
        "__v": 0,
        "active": true,
        "info": "Massimo Italiano",
        "name": "Massimo Italiano",
        "slug": "massimo-italiano",
        "uid": "admin@sportscenter.com",
        "brand": 50
      },
      {
        "_id": "57c17ecf993c5faed8000004",
        "__v": 0,
        "active": true,
        "info": "New Look",
        "name": "New Look",
        "slug": "new-look",
        "uid": "admin@sportscenter.com",
        "brand": 30
      },
      {
        "_id": "57c17eec993c5f81f9000006",
        "__v": 0,
        "active": true,
        "info": "LA BRIZA",
        "name": "LA BRIZA",
        "slug": "la-briza",
        "uid": "admin@sportscenter.com",
        "brand": 60
      }, function () {
        Brand.find({}, function (err, data) { data.forEach(data => { data.save() }); })
        console.log('finished populating brands');
      });
  }
});


Brand.find(function (err, data) {
  if (data.length < 1) {
    Brand.create({
      "_id": "5607c58bdddfb6780c5bddf3",
      "name": "Estelle",
      "info": "Estelle",
      "slug": "estelle",
      "__v": 0,
      "active": true
    },
      {
        "_id": "5607c599dddfb6780c5bddf4",
        "name": "FREECULTR",
        "info": "FREECULTR",
        "slug": "freecultr",
        "__v": 0,
        "active": true
      },
      {
        "__v": 0,
        "slug": "alleviater",
        "info": "Alleviater",
        "name": "Alleviater",
        "_id": "5607c5c1dddfb6780c5bddf8",
        "active": true
      },
      {
        "_id": "57c17a41993c5f81f9000000",
        "__v": 0,
        "brand": 10,
        "active": true,
        "info": "Li-Ning",
        "name": "Li-Ning",
        "slug": "li-ning",
        "uid": "blitz@sportscenter.com"
      },
      {
        "_id": "57c17d4c993c5f81f9000001",
        "__v": 0,
        "active": true,
        "info": "Knotty Derby",
        "name": "Knotty Derby",
        "slug": "knotty-derby",
        "uid": "admin@sportscenter.com",
        "brand": 70
      },
      {
        "_id": "57c17d83993c5faed8000000",
        "__v": 0,
        "active": true,
        "info": "J Collection",
        "name": "J Collection",
        "slug": "j-collection",
        "uid": "admin@sportscenter.com",
        "brand": 90
      },
      {
        "_id": "57c17dab993c5f81f9000002",
        "__v": 0,
        "active": true,
        "info": "Inc.5",
        "name": "Inc.5",
        "slug": "inc5",
        "uid": "admin@sportscenter.com",
        "brand": 100
      },
      {
        "_id": "57c17dce993c5faed8000001",
        "__v": 0,
        "active": true,
        "info": "Garfield",
        "name": "Garfield",
        "slug": "garfield",
        "uid": "admin@sportscenter.com",
        "brand": 120
      },
      {
        "_id": "57c17df7993c5f81f9000003",
        "__v": 0,
        "active": true,
        "info": "Happy Feet",
        "name": "Happy Feet",
        "slug": "happy-feet",
        "uid": "admin@sportscenter.com",
        "brand": 110
      },
      {
        "_id": "57c17e1c993c5faed8000002",
        "__v": 0,
        "active": true,
        "info": "John Jacobs",
        "name": "John Jacobs",
        "slug": "john-jacobs",
        "uid": "admin@sportscenter.com",
        "brand": 80
      },
      {
        "_id": "57c17e42993c5f81f9000004",
        "__v": 0,
        "active": true,
        "info": "Melange",
        "name": "Melange",
        "slug": "melange",
        "uid": "admin@sportscenter.com",
        "brand": 40
      },
      {
        "_id": "57c17e6e993c5faed8000003",
        "__v": 0,
        "active": true,
        "info": "Phosphorus",
        "name": "Phosphorus",
        "slug": "phosphorus",
        "uid": "admin@sportscenter.com",
        "brand": 20
      },
      {
        "_id": "57c17e9f993c5f81f9000005",
        "__v": 0,
        "active": true,
        "info": "Massimo Italiano",
        "name": "Massimo Italiano",
        "slug": "massimo-italiano",
        "uid": "admin@sportscenter.com",
        "brand": 50
      },
      {
        "_id": "57c17ecf993c5faed8000004",
        "__v": 0,
        "active": true,
        "info": "New Look",
        "name": "New Look",
        "slug": "new-look",
        "uid": "admin@sportscenter.com",
        "brand": 30
      },
      {
        "_id": "57c17eec993c5f81f9000006",
        "__v": 0,
        "active": true,
        "info": "LA BRIZA",
        "name": "LA BRIZA",
        "slug": "la-briza",
        "uid": "admin@sportscenter.com",
        "brand": 60
      }, function () {
        Brand.find({}, function (err, data) { data.forEach(data => { data.save() }); })
        console.log('finished populating brands');
      });
  }
});
