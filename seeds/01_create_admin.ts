import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';
 
export async function seed(knex: Knex): Promise<void> {
  const hashedPassword = await bcrypt.hash('infoinfo', 10);
  return knex.raw(
    `
    INSERT INTO users (
      email,
      name,
      password
    ) VALUES (
      'info@info.com',
      'info',
      ?
    )
  `,
    [hashedPassword],
  );
}