import { db } from "../utils/db.js";

const alphanumericLowercase = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

class ClassService {
    async getClasses(user_id: number) {
        return await db.query(`select t1.role,t1.class_code,t1.class_name, t1.section, t2.teacher_name from 
                          (select e.role,c.class_code, c.name as class_name, c.section 
                          from enrollment as e inner join classes as c
                          on c.class_code = e.class_code where e.user_id = $1) as t1
                          inner join
                          (select e.class_code,u.first_name || ' ' || u.last_name as teacher_name 
                          from users u inner join enrollment e
                          on u.user_id = e.user_id where e.role = 'teacher') as t2
                          on t1.class_code = t2.class_code`, [user_id])
    }

    async getClass(class_code: string) {
        return await db.query(`select class_code,name,section from classes where class_code = $1`, [class_code])
    }

    async getPeople(class_code: string) {
        return await db.query(`select u.user_id,u.first_name || ' ' || u.last_name as full_name, e.role from users as u inner join enrollment as e on u.user_id = e.user_id where e.class_code = $1`, [class_code])
    }

    async joinClass(user_id: number, class_code: string) {
        return await db.query(`insert into enrollment (class_code,user_id,role)
                                values ($1,$2,'student');`, [class_code, user_id])
    }

    async createClass(user_id: number, class_name: string, section: string) {
        const client = await db.connect()
        const class_code = this.generateClassCode()
        try {
            await client.query(`begin;`)
            await client.query(`
                insert into classes (class_code,name,section)
                values ($1,$2,$3);
            `, [class_code, class_name, section])
            await client.query(`
                insert into enrollment (class_code,user_id,role)
                values ($1,$2,'teacher');
            `, [class_code, user_id])
            await client.query(`commit;`)
        } catch (error) {
            await client.query(`rollback;`)
            throw error
        }

    }

    async deleteClass(class_code: string) {
        return await db.query(`delete from classes where class_code = $1;`, [class_code])
    }

    async leaveClass(user_id: number, class_code: string) {
        return await db.query(`delete from enrollment where class_code = $1 and user_id = $2;`,
            [class_code, user_id]
        )
    }

    async getUserRole(user_id: number, class_code: string) {
        return await db.query(`select role from enrollment where class_code = $1 and user_id = $2;`,
            [class_code, user_id]
        )
    }

    async updateClass(class_code : string,name : string, section : string){
        return await db.query(`update classes set name = $1, section = $2 where class_code = $3`,
            [name, section,class_code]
        )
    }

    // if we have already generated n codes in the database,
    // then the probability that the next generated code by this function
    // will be a duplicate is n/36^6, which is very less :) but ofcourse
    // we need to handle it for a real app 
    generateClassCode() {
        let code = ''
        for (let i = 0; i < 6; i++) {
            const idx = Math.floor(Math.random() * 35)
            code += alphanumericLowercase[idx]
        }
        return code
    }
}




export default new ClassService()