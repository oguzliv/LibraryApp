--POSTGRESQL SYNTAX ---

CREATE TABLE IF NOT EXISTS public.book
(
    "createdAt" timestamp without time zone NOT NULL,
    "createdBy" character varying COLLATE pg_catalog."default",
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying COLLATE pg_catalog."default",
    name character varying COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL DEFAULT 'nextval('book_id_seq'::regclass)',
    score numeric(6,2),
    CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY (id)
)


CREATE TABLE IF NOT EXISTS public.borrowing
(
    "createdAt" timestamp without time zone NOT NULL,
    "createdBy" character varying COLLATE pg_catalog."default",
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying COLLATE pg_catalog."default",
    "returnedAt" timestamp without time zone,
    "borrowedAt" timestamp without time zone,
    returned boolean NOT NULL,
    id integer NOT NULL DEFAULT 'nextval('borrowing_id_seq'::regclass)',
    "UserId" integer,
    "BookId" integer,
    CONSTRAINT "PK_5bfeaa4e275c1a2e2ab257f2ee2" PRIMARY KEY (id),
    CONSTRAINT "FK_12cf052f39d38952da42d16da98" FOREIGN KEY ("BookId")
        REFERENCES public.book (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_f2f4ea039b98fc42e9b6d8a5eee" FOREIGN KEY ("UserId")
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public."user"
(
    "createdAt" timestamp without time zone NOT NULL,
    "createdBy" character varying COLLATE pg_catalog."default",
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying COLLATE pg_catalog."default",
    name character varying COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL DEFAULT 'nextval('user_id_seq'::regclass)',
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
)