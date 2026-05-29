import { MigrationBuilder } from "node-pg-migrate"
import bcrypt from "bcrypt"

const seedClasses = (pgm: MigrationBuilder) => {
  pgm.sql(`
    INSERT INTO classes (class_code, name, section) VALUES
      ('CS101', 'Introduction to Computer Science', 'A'),
      ('MATH201', 'Calculus II', 'B'),
      ('ENG105', 'Academic Writing', 'C');
  `);
}
const seedUsers = (pgm: MigrationBuilder) => {

  const hashedPassword = bcrypt.hashSync('password123', 10)

  pgm.sql(`
    INSERT INTO users (first_name, last_name, email, password) VALUES
      ('Alice', 'Johnson', 'alice@example.com', '${hashedPassword}'),
      ('Bob',   'Smith',   'bob@example.com',   '${hashedPassword}'),
      ('Carol', 'Williams','carol@example.com', '${hashedPassword}');
  `);
}
const seedEnrollment = (pgm: MigrationBuilder) => {
  pgm.sql(`
    INSERT INTO enrollment (class_code, user_id, role) VALUES
      ('CS101',   100, 'teacher'),
      ('CS101',   101, 'student'),
      ('MATH201', 102, 'student');
  `);
}
const seedPosts = (pgm: MigrationBuilder) => {
  pgm.sql(`
    INSERT INTO posts (content, user_id, class_code) VALUES
      ('Welcome to CS101! Please review the syllabus.', 100, 'CS101'),
      ('Can someone explain recursion?',                101, 'CS101'),
      ('Anyone else struggling with integrals?',        102, 'MATH201');
  `);
}
const seedComments = (pgm: MigrationBuilder) => {
  pgm.sql(`
    INSERT INTO comments (content, user_id, post_id) VALUES
      ('Great question! Think of it as a function calling itself.', 100, 100),
      ('I found this YouTube video really helpful: ...',            101, 101),
      ('Yes! Office hours are on Thursday at 3pm.',                 102, 102);
  `);
}

const seedMaterials = (pgm: MigrationBuilder) => {
  pgm.sql(`
    INSERT INTO materials (s3_bucket, s3_key, file_name,file_type,post_id) VALUES
      ('aws-s3-gcr', 'hello.pdf', 'hello.pdf', 'application/pdf',100);
  `);
}

export const seedDatabase = async (pgm: MigrationBuilder) => {
  // seed classes
  seedClasses(pgm)

  // seed users 
  seedUsers(pgm)

  // seed enrollment 
  seedEnrollment(pgm)

  // seed posts
  seedPosts(pgm)

  // seed comments
  seedComments(pgm)

  // seed materials
  seedMaterials(pgm)
};