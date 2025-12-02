// Queries to view MongoDB roles and users
// Run with: mongosh "mongodb://connection-string" view_mongodb_roles.js

use('db_crm_dentistas');

// 1. List all roles
print('\n=== All Roles ===');
db.getRoles().forEach(function(role) {
    print('Role: ' + role.role);
    print('  Database: ' + role.db);
    if (role.privileges && role.privileges.length > 0) {
        print('  Privileges:');
        role.privileges.forEach(function(priv) {
            print('    - ' + priv.actions.join(', ') + ' on ' + priv.resource.db + '.' + (priv.resource.collection || '*'));
        });
    }
    if (role.roles && role.roles.length > 0) {
        print('  Inherited Roles: ' + role.roles.map(r => r.role).join(', '));
    }
    print('');
});

// 2. List all users
print('\n=== All Users ===');
db.getUsers().forEach(function(user) {
    print('User: ' + user.user);
    print('  Database: ' + user.db);
    if (user.roles && user.roles.length > 0) {
        print('  Roles: ' + user.roles.map(r => r.role).join(', '));
    }
    print('');
});

// 3. View specific roles
print('\n=== CRM Roles ===');
var crmRoles = ['it_administrator', 'dentist_secretary', 'dentista'];
crmRoles.forEach(function(roleName) {
    var role = db.getRole(roleName);
    if (role) {
        print('Role: ' + role.role);
        if (role.privileges && role.privileges.length > 0) {
            print('  Privileges:');
            role.privileges.forEach(function(priv) {
                print('    - ' + priv.actions.join(', ') + ' on ' + priv.resource.db + '.' + (priv.resource.collection || '*'));
            });
        }
        if (role.roles && role.roles.length > 0) {
            print('  Inherited Roles: ' + role.roles.map(r => r.role).join(', '));
        }
        print('');
    }
});

// 4. View specific users
print('\n=== CRM Users ===');
var crmUsers = ['admin_user', 'secretary_user', 'dentist_user'];
crmUsers.forEach(function(userName) {
    var user = db.getUser(userName);
    if (user) {
        print('User: ' + user.user);
        if (user.roles && user.roles.length > 0) {
            print('  Roles: ' + user.roles.map(r => r.role).join(', '));
        }
        print('');
    }
});

