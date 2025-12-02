// MongoDB Roles and Users Creation Script
// Run with: mongosh "mongodb://connection-string" mongodb_roles.js
// Or: mongosh <database_name> mongodb_roles.js

// Select database
use('db_crm_dentistas');

// ============================================
// 1. IT Administrator Role
// ============================================
try {
    db.createRole({
        role: 'it_administrator',
        privileges: [
            {
                resource: { db: 'db_crm_dentistas', collection: '' },
                actions: ['find', 'insert', 'update', 'remove', 'createIndex', 'dropIndex', 'listIndexes']
            },
            {
                resource: { db: 'db_crm_dentistas', collection: 'expedientes' },
                actions: ['find', 'insert', 'update', 'remove', 'createIndex', 'dropIndex']
            },
            {
                resource: { db: 'db_crm_dentistas', collection: '' },
                actions: ['createCollection', 'dropCollection', 'listCollections']
            },
            {
                resource: { db: 'db_crm_dentistas', collection: '' },
                actions: ['dbAdmin', 'userAdmin']
            }
        ],
        roles: []
    });
    print('✅ Role it_administrator created');
} catch (e) {
    if (e.code === 51003) {
        print('ℹ️  Role it_administrator already exists');
    } else {
        print('❌ Error creating it_administrator: ' + e.message);
    }
}

// ============================================
// 2. Dentist Secretary Role
// ============================================
try {
    db.createRole({
        role: 'dentist_secretary',
        privileges: [
            {
                resource: { db: 'db_crm_dentistas', collection: 'expedientes' },
                actions: ['find', 'insert', 'update']
            }
        ],
        roles: []
    });
    print('✅ Role dentist_secretary created');
} catch (e) {
    if (e.code === 51003) {
        print('ℹ️  Role dentist_secretary already exists');
    } else {
        print('❌ Error creating dentist_secretary: ' + e.message);
    }
}

// ============================================
// 3. Dentista Role
// ============================================
try {
    db.createRole({
        role: 'dentista',
        privileges: [
            {
                resource: { db: 'db_crm_dentistas', collection: 'expedientes' },
                actions: ['find', 'insert', 'update', 'remove']
            }
        ],
        roles: []
    });
    print('✅ Role dentista created');
} catch (e) {
    if (e.code === 51003) {
        print('ℹ️  Role dentista already exists');
    } else {
        print('❌ Error creating dentista: ' + e.message);
    }
}

// ============================================
// Create Users
// ============================================

// IT Administrator User
try {
    db.createUser({
        user: 'admin_user',
        pwd: 'admin_password_123',
        roles: ['it_administrator']
    });
    print('✅ User admin_user created');
} catch (e) {
    if (e.code === 51003) {
        print('ℹ️  User admin_user already exists');
    } else {
        print('❌ Error creating admin_user: ' + e.message);
    }
}

// Dentist Secretary User
try {
    db.createUser({
        user: 'secretary_user',
        pwd: 'secretary_password_123',
        roles: ['dentist_secretary']
    });
    print('✅ User secretary_user created');
} catch (e) {
    if (e.code === 51003) {
        print('ℹ️  User secretary_user already exists');
    } else {
        print('❌ Error creating secretary_user: ' + e.message);
    }
}

// Dentista User
try {
    db.createUser({
        user: 'dentist_user',
        pwd: 'dentist_password_123',
        roles: ['dentista']
    });
    print('✅ User dentist_user created');
} catch (e) {
    if (e.code === 51003) {
        print('ℹ️  User dentist_user already exists');
    } else {
        print('❌ Error creating dentist_user: ' + e.message);
    }
}

print('\n✅ MongoDB roles and users creation completed!');

