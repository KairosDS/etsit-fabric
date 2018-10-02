'use strict';

module.exports = {
    users: {
        admin: {
            id: '2133d32a',
            username: 'admin',
            name: 'First Admin',
            org: 'org1',
            password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
            roles: ['USER', 'ADMIN'],
            blockchain: 'fabric'
        },
        user: {
            id: '2133d32b',
            username: 'user',
            name: 'First User1',
            org: 'Org1',
            password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
            roles: ['USER'],
            blockchain: 'fabric'
        }
    }
}
