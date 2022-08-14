const { Sequelize, DataTypes } = require('sequelize');

const tableNames = ['user', 'skill'];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TYPE enum_user_gender AS ENUM ('Male', 'Female', 'Other');
      CREATE TYPE enum_skill_proficiency AS ENUM ('Beginer', 'Intermediate', 'Advanced');

      CREATE TABLE IF NOT EXISTS public."user"
      (
          id serial NOT NULL,
          first_name character varying(128) COLLATE pg_catalog."default",
          last_name character varying(128) COLLATE pg_catalog."default",
          gender enum_user_gender,
          created_at timestamp with time zone,
          updated_at timestamp with time zone,
          CONSTRAINT user_pkey PRIMARY KEY (id)
      );
        
      CREATE TABLE IF NOT EXISTS public.skill
      (
          id serial NOT NULL,
          user_id integer NOT NULL,
          name character varying(255) COLLATE pg_catalog."default" NOT NULL,
          proficiency enum_skill_proficiency,
          created_at timestamp with time zone,
          updated_at timestamp with time zone,
          CONSTRAINT skill_pkey PRIMARY KEY (id),
          CONSTRAINT "skill_user_id_fkey" FOREIGN KEY (user_id)
              REFERENCES public."user" (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION
      );
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const tablePromises = tableNames.map(async table => {
        await queryInterface.dropTable(table, { transaction, cascade: true });
      });

      await Promise.all(tablePromises);
    });
  }
};
