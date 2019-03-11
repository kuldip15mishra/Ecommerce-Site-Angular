export class Settings {
    static demo: boolean = false;
    static reviewSettings: any = {
        enabled: true, // Enables review for products
        moderate: false // If enabled, the review will be visible to public after admin approval
    };
    static userRoles: any[] = ['vendorprivateuser','user', 'vendor','privatevendor' , 'manager', 'admin' ]; // This should be in ascending order of authority. e.g. In this case guest will not have access to any other role, where as admin will have the role of guest+user+vendor+manager+admin
    static paymentStatus: string[] = ['Pending', 'Paid', 'created']; // On success from Paypal it stores as created
    static orderStatus: string[] = ['Payment Pending', 'Order Placed', 'Paid', 'Order Accepted', 'Order Executed', 'Shipped', 'Delivered', 'Not in Stock', 'Cancellation Requested', 'Cancelled'];
    static paymentMethods: any[] = ['PayPal', 'COD'];

    static country: any = { name: 'India', code: 'IN' };
    static currency: any = {
        symbol: '$', //Required only for sort icons at homepage
        code: 'AUD', // Shop currency
        paypal: 'USD',// Paypal currency code *** Please choose from https://developer.paypal.com/docs/classic/api/currency_codes/
        exchange_rate: '0.015' // Paypal currency code(USD) / Shop currency (INR) ***  exchange_rate should not be 0 else it will generate divided by 0 error
    };
    static menu: any[] = [
        { name: 'Products', url: '/admin/product', icon: 'store', authenticate: 'privatevendor', color: 'black', dashboard: true },
        { name: 'My Orders', url: '/admin/my-orders', icon: 'watch_later', authenticate: 'user', color: 'grey', dashboard: true },
        { name: 'Manage Orders', url: '/admin/manage-orders', icon: 'history', authenticate: 'privatevendor', color: 'orange', dashboard: true },
        { name: 'Address', url: '/admin/address', icon: 'location_city', authenticate: 'user', color: 'yellow', dashboard: true },
        { name: 'Reviews', url: '/admin/reviews', icon: 'stars', authenticate: 'manager', color: 'blue', dashboard: true },
        { name: 'My Reviews', url: '/admin/my-reviews', icon: 'star_rate', authenticate: 'user', color: 'green', dashboard: true },
        { name: 'My Wishlist', url: '/admin/wishlist', icon: 'favorite', authenticate: 'user', color: 'purple', dashboard: true },
        { name: 'Brands', url: '/admin/brands', icon: 'wb_auto', authenticate: 'manager', color: 'purple', dashboard: true },
        { name: 'Categories', url: '/admin/categories', icon: 'view_comfy', authenticate: 'privatevendor', color: 'light-blue', dashboard: true },
        { name: 'Features', url: '/admin/features', icon: 'check_circle', authenticate: 'manager', color: 'brown', dashboard: true },
        { name: 'Coupons', url: '/admin/coupons', icon: 'style', authenticate: 'admin', color: 'pink', dashboard: true },
        { name: 'Shippings', url: '/admin/shippings', icon: 'local_shipping', authenticate: 'admin', color: 'red', dashboard: true },
        { name: 'Users', url: '/admin/users', icon: 'face', img: 'auth.png', authenticate: 'admin', color: 'lime', dashboard: true },
        { name: 'Media Library', url: '/admin/media-library', authenticate: 'user', icon: 'perm_media' },
        { name: 'Profile', url: '/account/edit-profile', authenticate: 'user', icon: 'face' },
        { name: 'Change Password', url: '/account/change-password', authenticate: 'user', icon: 'lock' },
        { name: 'Create Vendor', url: '/admin/vendor', authenticate: 'admin', icon: 'face' ,dashboard: false},
       { name: 'Create Private User', url: '/admin/privatestore', authenticate: 'privatevendor', icon: 'face' ,dashboard: true},
       { name: 'SubCategory', url: '/admin/subcategory', authenticate: 'privatevendor', icon: 'face' ,dashboard: true},
      
    ];
}
