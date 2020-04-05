<<<<<<< HEAD
DROP TABLE public.transfusion;
DROP TABLE public.respondsto;
DROP TABLE public.response;
DROP TABLE public.requests;
DROP TABLE public.request;
DROP TABLE public.report;
DROP TABLE public."reportReasonCode";
DROP TABLE public.recipient;
DROP TABLE public.donationitem;
DROP TABLE public.nurse;
DROP TABLE public.location;
DROP TABLE public.lab;
DROP TABLE public.healthinfohasa;
DROP TABLE public.donor;
DROP TABLE public.nonstaff;
DROP TABLE public.donationreserves;
DROP TABLE public.administrator;



CREATE TABLE public.administrator
(
    id character(8) COLLATE pg_catalog."default" NOT NULL,
    password character(32) COLLATE pg_catalog."default" NOT NULL,
    email character(64) COLLATE pg_catalog."default",
    phonenum character(16) COLLATE pg_catalog."default",
    name character(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT administrator_pkey PRIMARY KEY (id)
);

CREATE TABLE public.donationreserves
(
    typestored character(64) COLLATE pg_catalog."default" NOT NULL,
    quantity integer,
    CONSTRAINT donationreserves_pkey PRIMARY KEY (typestored)
);

CREATE TABLE public.nonstaff
(
    id character(8) COLLATE pg_catalog."default" NOT NULL,
    address character(255) COLLATE pg_catalog."default" NOT NULL,
    email character(64) COLLATE pg_catalog."default" NOT NULL,
    phone character(10) COLLATE pg_catalog."default" NOT NULL,
    name character(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT nonstaff_pkey PRIMARY KEY (id)
);

CREATE TABLE public.donor
(
    donorid character(8) COLLATE pg_catalog."default" NOT NULL,
    candonate boolean NOT NULL,
    CONSTRAINT donor_pkey PRIMARY KEY (donorid),
    CONSTRAINT donor_donorid_fkey FOREIGN KEY (donorid)
        REFERENCES public.nonstaff (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE public.healthinfohasa
(
    dateadded date NOT NULL,
    nonstaffid character(8) COLLATE pg_catalog."default" NOT NULL,
    birthdate date,
    height integer,
    weight integer,
    bloodtype character(6) COLLATE pg_catalog."default",
    CONSTRAINT healthinfohasa_pkey PRIMARY KEY (nonstaffid),
    CONSTRAINT healthinfohasa_bloodtype_fkey FOREIGN KEY (bloodtype)
        REFERENCES public.donationreserves (typestored) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT healthinfohasa_nonstaffid_fkey FOREIGN KEY (nonstaffid)
        REFERENCES public.nonstaff (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);


CREATE TABLE public.lab
(
    id character(8) COLLATE pg_catalog."default" NOT NULL,
    password character(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT lab_pkey PRIMARY KEY (id)
);

CREATE TABLE public.location
(
    id character(8) COLLATE pg_catalog."default" NOT NULL,
    "labId" character(8) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT location_pkey PRIMARY KEY (id),
    CONSTRAINT "labId" FOREIGN KEY ("labId")
        REFERENCES public.lab (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE public.nurse
(
    id character(8) COLLATE pg_catalog."default" NOT NULL,
    password character(32) COLLATE pg_catalog."default" NOT NULL,
    locationid character(8) COLLATE pg_catalog."default" NOT NULL,
    email character(64) COLLATE pg_catalog."default",
    phonenumber character(16) COLLATE pg_catalog."default",
    name character(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT nurse_pkey PRIMARY KEY (id),
    CONSTRAINT nurse_locationid_fkey FOREIGN KEY (locationid)
        REFERENCES public.location (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.donationitem
(
    donorid character(8) COLLATE pg_catalog."default" NOT NULL,
    donationid character(8) COLLATE pg_catalog."default" NOT NULL,
    date date,
    quantity integer,
    nurseid character(8) COLLATE pg_catalog."default",
    istested boolean,
    CONSTRAINT donationitem_pkey PRIMARY KEY (donationid),
    CONSTRAINT donationitem_donorid_fkey FOREIGN KEY (donorid)
        REFERENCES public.donor (donorid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT donationitem_nurseid_fkey FOREIGN KEY (nurseid)
        REFERENCES public.nurse (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.recipient
(
    recipientid character(8) COLLATE pg_catalog."default" NOT NULL,
    amtrequired integer,
    CONSTRAINT recipient_pkey PRIMARY KEY (recipientid),
    CONSTRAINT recipient_recipientid_fkey FOREIGN KEY (recipientid)
        REFERENCES public.nonstaff (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);


CREATE TABLE public."reportReasonCode"
(
    reasoncode character(5) COLLATE pg_catalog."default" NOT NULL,
    iscompatible boolean,
    CONSTRAINT reasonofrejection_pkey PRIMARY KEY (reasoncode)
);


CREATE TABLE public.report
(
    reportid character(8) COLLATE pg_catalog."default" NOT NULL,
    date date,
    reasoncode character(5) COLLATE pg_catalog."default" NOT NULL,
    donationid character(8) COLLATE pg_catalog."default",
    CONSTRAINT report_pkey PRIMARY KEY (reportid),
    CONSTRAINT donationid UNIQUE (donationid),
    CONSTRAINT report_donationid_fkey FOREIGN KEY (donationid)
        REFERENCES public.donationitem (donationid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT report_rejectionreasoncode_fkey FOREIGN KEY (reasoncode)
        REFERENCES public."reportReasonCode" (reasoncode) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.request
(
    transactionnum integer NOT NULL,
    type character(64) COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    patient character(8) COLLATE pg_catalog."default",
    CONSTRAINT request_pkey PRIMARY KEY (transactionnum),
    CONSTRAINT patient FOREIGN KEY (patient)
        REFERENCES public.recipient (recipientid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE public.requests
(
    adminid character(8) COLLATE pg_catalog."default" NOT NULL,
    nurseid character(8) COLLATE pg_catalog."default" NOT NULL,
    transactionnumber integer NOT NULL,
    date date NOT NULL,
    CONSTRAINT requests_pkey PRIMARY KEY (adminid, nurseid, transactionnumber),
    CONSTRAINT transactionnumber UNIQUE (transactionnumber),
    CONSTRAINT requests_adminid_fkey FOREIGN KEY (adminid)
        REFERENCES public.administrator (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT requests_nurseid_fkey FOREIGN KEY (nurseid)
        REFERENCES public.nurse (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT requests_transactionnumber_fkey FOREIGN KEY (transactionnumber)
        REFERENCES public.request (transactionnum) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.response
(
    transactionnum integer NOT NULL,
    quantity integer NOT NULL,
    type character(64) COLLATE pg_catalog."default" NOT NULL,
    isvalid boolean,
    patientid character(8) COLLATE pg_catalog."default",
    CONSTRAINT response_pkey PRIMARY KEY (transactionnum),
    CONSTRAINT transactionnum UNIQUE (transactionnum),
    CONSTRAINT response_patientid_fkey FOREIGN KEY (patientid)
        REFERENCES public.recipient (recipientid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.respondsto
(
    adminid character(8) COLLATE pg_catalog."default" NOT NULL,
    nurseid character(8) COLLATE pg_catalog."default" NOT NULL,
    transactionnumber integer NOT NULL,
    dateandtime date NOT NULL,
    CONSTRAINT respondsto_pkey PRIMARY KEY (adminid, nurseid, transactionnumber),
    CONSTRAINT respondsto_adminid_fkey FOREIGN KEY (adminid)
        REFERENCES public.administrator (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT respondsto_nurseid_fkey FOREIGN KEY (nurseid)
        REFERENCES public.nurse (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT respondsto_transactionnumber_fkey FOREIGN KEY (transactionnumber)
        REFERENCES public.response (transactionnum) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.transfusion
(
    transfusionid character(8) COLLATE pg_catalog."default" NOT NULL,
    recipientid character(8) COLLATE pg_catalog."default" NOT NULL,
    nurseid character(8) COLLATE pg_catalog."default" NOT NULL,
    transactionnumber integer,
    datecompleted date NOT NULL,
    CONSTRAINT transfusion_pkey PRIMARY KEY (transfusionid, recipientid),
    CONSTRAINT transfusion_transactionnumber_key UNIQUE (transactionnumber),
    CONSTRAINT transactionnum_fk FOREIGN KEY (transactionnumber)
        REFERENCES public.response (transactionnum) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL,
    CONSTRAINT transfusion_nurseid_fkey FOREIGN KEY (nurseid)
        REFERENCES public.nurse (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT transfusion_recipientid_fkey FOREIGN KEY (recipientid)
        REFERENCES public.recipient (recipientid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

INSERT INTO public.administrator VALUES ('admin1', 'password1234', 'admin1@mail.com', 1231234321, 'John A');
INSERT INTO public.administrator VALUES ('admin2', 'password3456', 'admin2@mail.com', 1231234322, 'Amelia B');
INSERT INTO public.administrator VALUES ('admin3', 'password5678', 'admin3@mail.com', 1231234323, 'Peter C');
INSERT INTO public.administrator VALUES ('admin4', 'password5689', 'admin4@mail.com', 1231234324, 'James B');
INSERT INTO public.administrator VALUES ('admin5', 'password5690', 'admin5@mail.com', 1231234325, 'Carol A');



INSERT INTO public.donationreserves VALUES ('A-', 1000);
INSERT INTO public.donationreserves VALUES ('A+', 1000);
INSERT INTO public.donationreserves VALUES ('AB-', 1000);
INSERT INTO public.donationreserves VALUES ('AB+', 1000);
INSERT INTO public.donationreserves VALUES ('B-', 1000);
INSERT INTO public.donationreserves VALUES ('B+', 1000);
INSERT INTO public.donationreserves VALUES ('O-', 1000);
INSERT INTO public.donationreserves VALUES ('O+', 1000);

INSERT INTO public.nonstaff VALUES ('ns1', 'Vancouver', 'ns1@mail.com', 3451234123, 'Jen D');
INSERT INTO public.nonstaff VALUES ('ns2', 'Burnaby', 'ns2@mail.com', 3451234124, 'Calvin E');
INSERT INTO public.nonstaff VALUES ('ns3', 'Surrey', 'ns3@mail.com', 3451234125, 'Martha F');
INSERT INTO public.nonstaff VALUES ('ns4', 'Coquitlam', 'ns4@mail.com', 3451234126, 'Zac G');
INSERT INTO public.nonstaff VALUES ('ns5', 'Richmond', 'ns5@mail.com', 3451234127, 'Sally H');
INSERT INTO public.nonstaff VALUES ('ns6', 'Vancouver', 'ns6@mail.com', 3451234128, 'Brian I');
INSERT INTO public.nonstaff VALUES ('ns7', 'Burnaby', 'ns7@mail.com', 3451234129, 'Nancy J');
INSERT INTO public.nonstaff VALUES ('ns8', 'Surrey', 'ns8@mail.com', 3451234120, 'Kevin K');
INSERT INTO public.nonstaff VALUES ('ns9', 'Coquitlam', 'ns9@mail.com', 3451234121, 'Iris L');
INSERT INTO public.nonstaff VALUES ('ns10', 'Richmond', 'ns10@mail.com', 3451234122, 'Lauren M');


INSERT INTO public.donor VALUES ('ns1', true);
INSERT INTO public.donor VALUES ('ns2', false);
INSERT INTO public.donor VALUES ('ns3', true);
INSERT INTO public.donor VALUES ('ns4', true);
INSERT INTO public.donor VALUES ('ns5', true);

INSERT INTO public.healthinfohasa VALUES('2020-01-01', 'ns1', '1999-09-09', 160, 60, 'A+');
INSERT INTO public.healthinfohasa VALUES('2020-01-02', 'ns2', '1999-05-10', 178, 71, 'A-');
INSERT INTO public.healthinfohasa VALUES('2020-01-03', 'ns3', '1999-11-08', 168, 55, 'B+');
INSERT INTO public.healthinfohasa VALUES('2020-01-04', 'ns4', '1999-02-07', 190, 88, 'B-');
INSERT INTO public.healthinfohasa VALUES('2020-01-05', 'ns5', '1999-12-06', 160, 60, 'AB+');
INSERT INTO public.healthinfohasa VALUES('2020-01-06', 'ns6', '1999-03-05', 160, 60, 'AB-');
INSERT INTO public.healthinfohasa VALUES('2020-01-07', 'ns7', '1999-01-04', 160, 60, 'O+');
INSERT INTO public.healthinfohasa VALUES('2020-01-08', 'ns8', '1999-10-03', 160, 60, 'O-');
INSERT INTO public.healthinfohasa VALUES('2020-01-09', 'ns9', '1999-06-02', 160, 60, 'A+');
INSERT INTO public.healthinfohasa VALUES('2020-01-10', 'ns10', '1999-04-01', 160, 60, 'B+');

INSERT INTO public.lab VALUES('L001', 'pw111');
INSERT INTO public.lab VALUES('L002', 'pw222');
INSERT INTO public.lab VALUES('L003', 'pw333');
INSERT INTO public.lab VALUES('L004', 'pw444');
INSERT INTO public.lab VALUES('L005', 'pw555');

INSERT INTO public.location VALUES('1', 'L001');
INSERT INTO public.location VALUES('2', 'L002');
INSERT INTO public.location VALUES('3', 'L003');
INSERT INTO public.location VALUES('4', 'L004');
INSERT INTO public.location VALUES('5', 'L005');

INSERT INTO public.nurse VALUES('N100', 'p1', '1', 'N100@mail.com', 12123455, 'Derek N');
INSERT INTO public.nurse VALUES('N200', 'p2', '2', 'N100@mail.com', 12123456, 'Erin O');
INSERT INTO public.nurse VALUES('N300', 'p3', '3', 'N100@mail.com', 12123457, 'Frederik P');
INSERT INTO public.nurse VALUES('N400', 'p4', '4', 'N100@mail.com', 12123458, 'George Q');
INSERT INTO public.nurse VALUES('N500', 'p5', '5', 'N100@mail.com', 12123459, 'Helen R');

INSERT INTO public.donationitem VALUES('ns1', 'd100', '2020-02-01', 200, 'N100', false);
INSERT INTO public.donationitem VALUES('ns3', 'd101', '2020-02-01', 200, 'N200', false);
INSERT INTO public.donationitem VALUES('ns3', 'd102', '2020-02-01', 200, 'N300', false);
INSERT INTO public.donationitem VALUES('ns4', 'd103', '2020-02-01', 200, 'N400', false);
INSERT INTO public.donationitem VALUES('ns5', 'd104', '2020-02-01', 200, 'N500', false);

INSERT INTO public.recipient VALUES ('ns6', 200);
INSERT INTO public.recipient VALUES ('ns7', 300);
INSERT INTO public.recipient VALUES ('ns8', 400);
INSERT INTO public.recipient VALUES ('ns9', 300);
INSERT INTO public.recipient VALUES ('ns10', 200);

INSERT INTO public."reportReasonCode" VALUES ('RR000', false);
INSERT INTO public."reportReasonCode" VALUES ('RR111', false);
INSERT INTO public."reportReasonCode" VALUES ('RR222', false);
INSERT INTO public."reportReasonCode" VALUES ('RR333', true);
INSERT INTO public."reportReasonCode" VALUES ('RR444', true);

INSERT INTO public.report VALUES ('RP1', '2020-03-01', 'RR000', 'd100');
INSERT INTO public.report VALUES ('RP2', '2020-03-01', 'RR111', 'd101');
INSERT INTO public.report VALUES ('RP3', '2020-03-01', 'RR222', 'd102');
INSERT INTO public.report VALUES ('RP4', '2020-03-01', 'RR333', 'd103');
INSERT INTO public.report VALUES ('RP5', '2020-03-01', 'RR444', 'd104');

INSERT INTO public.request VALUES (800, 'AB-', 300, 'ns6');
INSERT INTO public.request VALUES (801, 'O+', 1300, 'ns7');
INSERT INTO public.request VALUES (802, 'O-', 300, 'ns8');
INSERT INTO public.request VALUES (803, 'A+', 300, 'ns9');
INSERT INTO public.request VALUES (804, 'B+', 300, 'ns10');

INSERT INTO public.requests VALUES ('admin1', 'N100', 800, '2020-03-03');
INSERT INTO public.requests VALUES ('admin2', 'N200', 801, '2020-03-03');
INSERT INTO public.requests VALUES ('admin3', 'N300', 802, '2020-03-03');
INSERT INTO public.requests VALUES ('admin4', 'N400', 803, '2020-03-03');
INSERT INTO public.requests VALUES ('admin5', 'N500', 804, '2020-03-03');

INSERT INTO public.response VALUES (900, 300, 'AB-', true, 'ns6');
INSERT INTO public.response VALUES (901, 300, 'O+', false, 'ns7');
INSERT INTO public.response VALUES (902, 300, 'O-', true, 'ns8');
INSERT INTO public.response VALUES (903, 300, 'A+', true, 'ns9');
INSERT INTO public.response VALUES (904, 300, 'B+', true, 'ns10');

INSERT INTO public.respondsto VALUES ('admin1', 'N100', 900, '2020-03-05');
INSERT INTO public.respondsto VALUES ('admin2', 'N200', 901, '2020-03-05');
INSERT INTO public.respondsto VALUES ('admin3', 'N300', 902, '2020-03-05');
INSERT INTO public.respondsto VALUES ('admin4', 'N400', 903, '2020-03-05');
INSERT INTO public.respondsto VALUES ('admin5', 'N500', 904, '2020-03-05');

INSERT INTO public.transfusion VALUES('t1', 'ns6', 'N100', 900, '2020-03-07');
INSERT INTO public.transfusion VALUES('t2', 'ns7', 'N200', 901, '2020-03-07');
INSERT INTO public.transfusion VALUES('t3', 'ns8', 'N300', 902, '2020-03-07');
INSERT INTO public.transfusion VALUES('t4', 'ns9', 'N400', 903, '2020-03-07');
INSERT INTO public.transfusion VALUES('t5', 'ns10', 'N500', 904, '2020-03-07');

=======
CREATE TABLE public.administrator
(
    id character(8) COLLATE pg_catalog."default" NOT NULL,
    password character(32) COLLATE pg_catalog."default" NOT NULL,
    email character(64) COLLATE pg_catalog."default",
    phonenum character(16) COLLATE pg_catalog."default",
    name character(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT administrator_pkey PRIMARY KEY (id)
);

CREATE TABLE public.donationreserves
(
    typestored character(64) COLLATE pg_catalog."default" NOT NULL,
    quantity integer,
    CONSTRAINT donationreserves_pkey PRIMARY KEY (typestored)
);

CREATE TABLE public.nonstaff
(
    id character(8) COLLATE pg_catalog."default" NOT NULL,
    address character(255) COLLATE pg_catalog."default" NOT NULL,
    email character(64) COLLATE pg_catalog."default" NOT NULL,
    phone character(10) COLLATE pg_catalog."default" NOT NULL,
    name character(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT nonstaff_pkey PRIMARY KEY (id)
);

CREATE TABLE public.donor
(
    donorid character(8) COLLATE pg_catalog."default" NOT NULL,
    candonate boolean NOT NULL,
    CONSTRAINT donor_pkey PRIMARY KEY (donorid),
    CONSTRAINT donor_donorid_fkey FOREIGN KEY (donorid)
        REFERENCES public.nonstaff (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE public.healthinfohasa
(
    dateadded date NOT NULL,
    nonstaffid character(8) COLLATE pg_catalog."default" NOT NULL,
    birthdate date,
    height integer,
    weight integer,
    bloodtype character(6) COLLATE pg_catalog."default",
    CONSTRAINT healthinfohasa_pkey PRIMARY KEY (nonstaffid),
    CONSTRAINT healthinfohasa_bloodtype_fkey FOREIGN KEY (bloodtype)
        REFERENCES public.donationreserves (typestored) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT healthinfohasa_nonstaffid_fkey FOREIGN KEY (nonstaffid)
        REFERENCES public.nonstaff (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);


CREATE TABLE public.lab
(
    id character(8) COLLATE pg_catalog."default" NOT NULL,
    password character(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT lab_pkey PRIMARY KEY (id)
);

CREATE TABLE public.location
(
    id character(8) COLLATE pg_catalog."default" NOT NULL,
    "labId" character(8) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT location_pkey PRIMARY KEY (id),
    CONSTRAINT "labId" FOREIGN KEY ("labId")
        REFERENCES public.lab (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE public.nurse
(
    id character(8) COLLATE pg_catalog."default" NOT NULL,
    password character(32) COLLATE pg_catalog."default" NOT NULL,
    locationid character(8) COLLATE pg_catalog."default" NOT NULL,
    email character(64) COLLATE pg_catalog."default",
    phonenumber character(16) COLLATE pg_catalog."default",
    name character(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT nurse_pkey PRIMARY KEY (id),
    CONSTRAINT nurse_locationid_fkey FOREIGN KEY (locationid)
        REFERENCES public.location (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.donationitem
(
    donorid character(8) COLLATE pg_catalog."default" NOT NULL,
    donationid character(8) COLLATE pg_catalog."default" NOT NULL,
    date date,
    quantity integer,
    nurseid character(8) COLLATE pg_catalog."default",
    istested boolean,
    CONSTRAINT donationitem_pkey PRIMARY KEY (donationid),
    CONSTRAINT donationitem_donorid_fkey FOREIGN KEY (donorid)
        REFERENCES public.donor (donorid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT donationitem_nurseid_fkey FOREIGN KEY (nurseid)
        REFERENCES public.nurse (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.recipient
(
    recipientid character(8) COLLATE pg_catalog."default" NOT NULL,
    amtrequired integer,
    CONSTRAINT recipient_pkey PRIMARY KEY (recipientid),
    CONSTRAINT recipient_recipientid_fkey FOREIGN KEY (recipientid)
        REFERENCES public.nonstaff (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);


CREATE TABLE public."reportReasonCode"
(
    reasoncode character(5) COLLATE pg_catalog."default" NOT NULL,
    iscompatible boolean,
    CONSTRAINT reasonofrejection_pkey PRIMARY KEY (reasoncode)
);


CREATE TABLE public.report
(
    reportid character(8) COLLATE pg_catalog."default" NOT NULL,
    date date,
    reasoncode character(5) COLLATE pg_catalog."default" NOT NULL,
    donationid character(8) COLLATE pg_catalog."default",
    CONSTRAINT report_pkey PRIMARY KEY (reportid),
    CONSTRAINT donationid UNIQUE (donationid),
    CONSTRAINT report_donationid_fkey FOREIGN KEY (donationid)
        REFERENCES public.donationitem (donationid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT report_rejectionreasoncode_fkey FOREIGN KEY (reasoncode)
        REFERENCES public."reportReasonCode" (reasoncode) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.request
(
    transactionnum integer NOT NULL,
    type character(64) COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    patient character(8) COLLATE pg_catalog."default",
    CONSTRAINT request_pkey PRIMARY KEY (transactionnum),
    CONSTRAINT patient FOREIGN KEY (patient)
        REFERENCES public.recipient (recipientid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE public.requests
(
    adminid character(8) COLLATE pg_catalog."default" NOT NULL,
    nurseid character(8) COLLATE pg_catalog."default" NOT NULL,
    transactionnumber integer NOT NULL,
    date date NOT NULL,
    CONSTRAINT requests_pkey PRIMARY KEY (adminid, nurseid, transactionnumber),
    CONSTRAINT transactionnumber UNIQUE (transactionnumber),
    CONSTRAINT requests_adminid_fkey FOREIGN KEY (adminid)
        REFERENCES public.administrator (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT requests_nurseid_fkey FOREIGN KEY (nurseid)
        REFERENCES public.nurse (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT requests_transactionnumber_fkey FOREIGN KEY (transactionnumber)
        REFERENCES public.request (transactionnum) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.response
(
    transactionnum integer NOT NULL,
    quantity integer NOT NULL,
    type character(64) COLLATE pg_catalog."default" NOT NULL,
    isvalid boolean,
    patientid character(8) COLLATE pg_catalog."default",
    CONSTRAINT response_pkey PRIMARY KEY (transactionnum),
    CONSTRAINT transactionnum UNIQUE (transactionnum),
    CONSTRAINT response_patientid_fkey FOREIGN KEY (patientid)
        REFERENCES public.recipient (recipientid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.respondsto
(
    adminid character(8) COLLATE pg_catalog."default" NOT NULL,
    nurseid character(8) COLLATE pg_catalog."default" NOT NULL,
    transactionnumber integer NOT NULL,
    dateandtime date NOT NULL,
    CONSTRAINT respondsto_pkey PRIMARY KEY (adminid, nurseid, transactionnumber),
    CONSTRAINT respondsto_adminid_fkey FOREIGN KEY (adminid)
        REFERENCES public.administrator (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT respondsto_nurseid_fkey FOREIGN KEY (nurseid)
        REFERENCES public.nurse (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT respondsto_transactionnumber_fkey FOREIGN KEY (transactionnumber)
        REFERENCES public.response (transactionnum) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public.transfusion
(
    transfusionid character(8) COLLATE pg_catalog."default" NOT NULL,
    recipientid character(8) COLLATE pg_catalog."default" NOT NULL,
    nurseid character(8) COLLATE pg_catalog."default" NOT NULL,
    transactionnumber integer,
    datecompleted date NOT NULL,
    CONSTRAINT transfusion_pkey PRIMARY KEY (transfusionid, recipientid),
    CONSTRAINT transfusion_transactionnumber_key UNIQUE (transactionnumber),
    CONSTRAINT transactionnum_fk FOREIGN KEY (transactionnumber)
        REFERENCES public.response (transactionnum) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL,
    CONSTRAINT transfusion_nurseid_fkey FOREIGN KEY (nurseid)
        REFERENCES public.nurse (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT transfusion_recipientid_fkey FOREIGN KEY (recipientid)
        REFERENCES public.recipient (recipientid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

INSERT INTO public.administrator VALUES ('admin1', 'password1234', 'admin1@mail.com', 1231234321, 'John A');
INSERT INTO public.administrator VALUES ('admin2', 'password3456', 'admin2@mail.com', 1231234322, 'Amelia B');
INSERT INTO public.administrator VALUES ('admin3', 'password5678', 'admin3@mail.com', 1231234323, 'Peter C');
INSERT INTO public.administrator VALUES ('admin4', 'password5689', 'admin4@mail.com', 1231234324, 'James B');
INSERT INTO public.administrator VALUES ('admin5', 'password5690', 'admin5@mail.com', 1231234325, 'Carol A');



INSERT INTO public.donationreserves VALUES ('A-', 1000);
INSERT INTO public.donationreserves VALUES ('A+', 1000);
INSERT INTO public.donationreserves VALUES ('AB-', 1000);
INSERT INTO public.donationreserves VALUES ('AB+', 1000);
INSERT INTO public.donationreserves VALUES ('B-', 1000);
INSERT INTO public.donationreserves VALUES ('B+', 1000);
INSERT INTO public.donationreserves VALUES ('O-', 1000);
INSERT INTO public.donationreserves VALUES ('O+', 1000);

INSERT INTO public.nonstaff VALUES ('nonstaff1', 'Vancouver', 'nonstaff1@mail.com', 3451234123, 'Jen D');
INSERT INTO public.nonstaff VALUES ('nonstaff2', 'Burnaby', 'nonstaff2@mail.com', 3451234124, 'Calvin E');
INSERT INTO public.nonstaff VALUES ('nonstaff3', 'Surrey', 'nonstaff3@mail.com', 3451234125, 'Martha F');
INSERT INTO public.nonstaff VALUES ('nonstaff4', 'Coquitlam', 'nonstaff4@mail.com', 3451234126, 'Zac G');
INSERT INTO public.nonstaff VALUES ('nonstaff5', 'Richmond', 'nonstaff5@mail.com', 3451234127, 'Sally H');
INSERT INTO public.nonstaff VALUES ('nonstaff6', 'Vancouver', 'nonstaff6@mail.com', 3451234128, 'Brian I');
INSERT INTO public.nonstaff VALUES ('nonstaff7', 'Burnaby', 'nonstaff7@mail.com', 3451234129, 'Nancy J');
INSERT INTO public.nonstaff VALUES ('nonstaff8', 'Surrey', 'nonstaff8@mail.com', 3451234120, 'Kevin K');
INSERT INTO public.nonstaff VALUES ('nonstaff9', 'Coquitlam', 'nonstaff9@mail.com', 3451234121, 'Iris L');
INSERT INTO public.nonstaff VALUES ('nonstaff10', 'Richmond', 'nonstaff10@mail.com', 3451234122, 'Lauren M');


INSERT INTO public.donor VALUES ('nonstaff1', true);
INSERT INTO public.donor VALUES ('nonstaff2', false);
INSERT INTO public.donor VALUES ('nonstaff3', true);
INSERT INTO public.donor VALUES ('nonstaff4', true);
INSERT INTO public.donor VALUES ('nonstaff5', true);

INSERT INTO public.healthinfohasa VALUES('2020-01-01', 'nonstaff1', '1999-09-09', 160, 60, 'A+');
INSERT INTO public.healthinfohasa VALUES('2020-01-02', 'nonstaff2', '1999-05-10', 178, 71, 'A-');
INSERT INTO public.healthinfohasa VALUES('2020-01-03', 'nonstaff3', '1999-11-08', 168, 55, 'B+');
INSERT INTO public.healthinfohasa VALUES('2020-01-04', 'nonstaff4', '1999-02-07', 190, 88, 'B-');
INSERT INTO public.healthinfohasa VALUES('2020-01-05', 'nonstaff5', '1999-12-06', 160, 60, 'AB+');
INSERT INTO public.healthinfohasa VALUES('2020-01-06', 'nonstaff6', '1999-03-05', 160, 60, 'AB-');
INSERT INTO public.healthinfohasa VALUES('2020-01-07', 'nonstaff7', '1999-01-04', 160, 60, 'O+');
INSERT INTO public.healthinfohasa VALUES('2020-01-08', 'nonstaff8', '1999-10-03', 160, 60, 'O-');
INSERT INTO public.healthinfohasa VALUES('2020-01-09', 'nonstaff9', '1999-06-02', 160, 60, 'A+');
INSERT INTO public.healthinfohasa VALUES('2020-01-10', 'nonstaff10', '1999-04-01', 160, 60, 'B+');

INSERT INTO public.lab VALUES('L001', 'pw111');
INSERT INTO public.lab VALUES('L002', 'pw222');
INSERT INTO public.lab VALUES('L003', 'pw333');
INSERT INTO public.lab VALUES('L004', 'pw444');
INSERT INTO public.lab VALUES('L005', 'pw555');

INSERT INTO public.location VALUES('1', 'L001');
INSERT INTO public.location VALUES('2', 'L002');
INSERT INTO public.location VALUES('3', 'L003');
INSERT INTO public.location VALUES('4', 'L004');
INSERT INTO public.location VALUES('5', 'L005');

INSERT INTO public.nurse VALUES('N100', 'p1', '1', 'N100@mail.com', 12123455, 'Derek N';
INSERT INTO public.nurse VALUES('N200', 'p2', '2', 'N100@mail.com', 12123456, 'Erin O';
INSERT INTO public.nurse VALUES('N300', 'p3', '3', 'N100@mail.com', 12123457, 'Frederik P';
INSERT INTO public.nurse VALUES('N400', 'p4', '4', 'N100@mail.com', 12123458, 'George Q';
INSERT INTO public.nurse VALUES('N500', 'p5', '5', 'N100@mail.com', 12123459, 'Helen R';

INSERT INTO public.donationitem VALUES('nonstaff1', 'd100', '2020-02-01', 'N100', false);
INSERT INTO public.donationitem VALUES('nonstaff3', 'd101', '2020-02-01', 'N200', false);
INSERT INTO public.donationitem VALUES('nonstaff3', 'd102', '2020-02-01', 'N300', false);
INSERT INTO public.donationitem VALUES('nonstaff4', 'd103', '2020-02-01', 'N400', false);
INSERT INTO public.donationitem VALUES('nonstaff5', 'd104', '2020-02-01', 'N500', false);

INSERT INTO public.recipient VALUES ('nonstaff6', 200);
INSERT INTO public.recipient VALUES ('nonstaff7', 300);
INSERT INTO public.recipient VALUES ('nonstaff8', 400);
INSERT INTO public.recipient VALUES ('nonstaff9', 300);
INSERT INTO public.recipient VALUES ('nonstaff10', 200);

INSERT INTO public."reportReasonCode" VALUES ('RR000', false);
INSERT INTO public."reportReasonCode" VALUES ('RR111', false);
INSERT INTO public."reportReasonCode" VALUES ('RR222', false);
INSERT INTO public."reportReasonCode" VALUES ('RR333', true);
INSERT INTO public."reportReasonCode" VALUES ('RR444', true);

INSERT INTO public.report VALUES ('RP1', 2020-03-01, 'RR000', 'd100');
INSERT INTO public.report VALUES ('RP2', 2020-03-01, 'RR111', 'd101');
INSERT INTO public.report VALUES ('RP3', 2020-03-01, 'RR222', 'd102');
INSERT INTO public.report VALUES ('RP4', 2020-03-01, 'RR333', 'd103');
INSERT INTO public.report VALUES ('RP5', 2020-03-01, 'RR444', 'd104');

INSERT INTO public.request VALUES (800, 'AB-', 300, 'nonstaff6');
INSERT INTO public.request VALUES (801, 'O+', 1300, 'nonstaff7');
INSERT INTO public.request VALUES (802, 'O-', 300, 'nonstaff8');
INSERT INTO public.request VALUES (803, 'A+', 300, 'nonstaff9');
INSERT INTO public.request VALUES (804, 'B+', 300, 'nonstaff10');

INSERT INTO public.requests VALUES ('admin1', 'N100', 800, '2020-03-03');
INSERT INTO public.requests VALUES ('admin2', 'N200', 801, '2020-03-03');
INSERT INTO public.requests VALUES ('admin3', 'N300', 802, '2020-03-03');
INSERT INTO public.requests VALUES ('admin4', 'N400', 803, '2020-03-03');
INSERT INTO public.requests VALUES ('admin5', 'N500', 804, '2020-03-03');

INSERT INTO public.response VALUES (900, 300, 'AB-', true, 'nonstaff6');
INSERT INTO public.response VALUES (901, 300, 'O+', false, 'nonstaff7');
INSERT INTO public.response VALUES (902, 300, 'O-', true, 'nonstaff8');
INSERT INTO public.response VALUES (903, 300, 'A+', true, 'nonstaff9');
INSERT INTO public.response VALUES (904, 300, 'B+', true, 'nonstaff10');

INSERT INTO public.respondsto VALUES ('admin1', 'N100', 900, '2020-03-05');
INSERT INTO public.respondsto VALUES ('admin2', 'N200', 901, '2020-03-05');
INSERT INTO public.respondsto VALUES ('admin3', 'N300', 902, '2020-03-05');
INSERT INTO public.respondsto VALUES ('admin4', 'N400', 903, '2020-03-05');
INSERT INTO public.respondsto VALUES ('admin5', 'N500', 904, '2020-03-05');

INSERT INTO public.transfusion VALUES('t1', 'nonstaff6', 'n100', 100, '2020-03-07');
INSERT INTO public.transfusion VALUES('t2', 'nonstaff7', 'n200', 200, '2020-03-07');
INSERT INTO public.transfusion VALUES('t3', 'nonstaff8', 'n300', 300, '2020-03-07');
INSERT INTO public.transfusion VALUES('t4', 'nonstaff9', 'n400', 400, '2020-03-07');
INSERT INTO public.transfusion VALUES('t5', 'nonstaff10', 'n500', 500, '2020-03-07');
>>>>>>> 39a4b596022ecf23ff80adfe492aa7c4cb3bd426
