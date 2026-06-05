import { MigrationBuilder } from "node-pg-migrate";
import { seedDatabase } from '../utils/seedUtils.ts'

const up = async (pgm: MigrationBuilder) => {

    // create classes table
    pgm.createTable('classes', {
        class_code: {
            type: 'varchar(6)',
            primaryKey: true,
        },
        name: {
            type: 'varchar(50)',
            notNull: true,
        },
        section: {
            type: 'varchar(25)',
        },
    });

    // create users table
    pgm.createTable('users', {
        user_id: {
            type: 'int',
            primaryKey: true,
            sequenceGenerated: {
                precedence: 'ALWAYS',
                start: 100
            }
        },
        first_name: {
            type: 'varchar(100)',
            notNull: true,
        },
        last_name: {
            type: 'varchar(100)',
        },
        email: {
            type: 'varchar(150)',
            notNull: true,
            unique: true,
        },
        password: {
            type: 'text',
            notNull: true,
        },
    });

    // create enrollment table
    pgm.createTable('enrollment', {
        class_code: {
            type: 'varchar(20)',
            notNull: true,
            references: 'classes',
            onDelete: 'CASCADE',
        },
        user_id: {
            type: 'int',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE'
        },
        role: {
            type: 'varchar(20)',
        },
    });

    pgm.addConstraint('enrollment', 'enrollment_pkey', {
        primaryKey: ['user_id', 'class_code'],
    });

    // create posts table
    pgm.createTable('posts', {
        post_id: {
            type: 'int',
            primaryKey: true,
            sequenceGenerated: {
                precedence: 'ALWAYS',
                start: 100
            }
        },
        content: {
            type: 'text',
            notNull: true,
        },
        posted_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp'),
        },
        user_id: {
            type: 'int',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE',
        },
        class_code: {
            type: 'varchar(20)',
            notNull: true,
            references: 'classes',
            onDelete: 'CASCADE',
        },
    });

    // create comments table
    pgm.createTable('comments', {
        comment_id: {
            type: 'int',
            primaryKey: true,
            sequenceGenerated: {
                precedence: 'ALWAYS',
                start: 100
            }
        },
        content: {
            type: 'text',
            notNull: true,
        },
        posted_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp'),
        },
        user_id: {
            type: 'int',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE',
        },
        post_id: {
            type: 'int',
            notNull: true,
            references: 'posts',
            onDelete: 'CASCADE',
        },
    });

    // create materials table
    pgm.createTable('materials', {
        material_id: {
            type: 'int',
            primaryKey: true,
            sequenceGenerated: {
                precedence: 'ALWAYS',
                start: 100
            }
        },
        s3_bucket: {
            type: 'text',
            notNull: true,
        },
        s3_key: {
            type: 'text',
            notNull: true,
        },
        file_name: {
            type: 'text',
            notNull: true,
        },
        file_type: {
            type: 'text',
            notNull: true,
        },
        post_id: {
            type: 'int',
            notNull: true,
            references: 'posts',
            onDelete: 'CASCADE',
        },
    });

    await seedDatabase(pgm)
};

const down = (pgm: MigrationBuilder) => {
    pgm.dropTable('materials');
    pgm.dropTable('comments');
    pgm.dropTable('posts');
    pgm.dropTable('enrollment');
    pgm.dropTable('users');
    pgm.dropTable('classes');
};

export { up, down }
