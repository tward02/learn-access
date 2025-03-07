--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    postid integer NOT NULL,
    userid integer NOT NULL,
    datetime timestamp without time zone NOT NULL,
    message text NOT NULL
);


ALTER TABLE public.comments OWNER TO neondb_owner;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO neondb_owner;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: level_files; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.level_files (
    id integer NOT NULL,
    levelid integer NOT NULL,
    name character varying(50) NOT NULL,
    filetype text NOT NULL,
    content text NOT NULL,
    readonly boolean DEFAULT false NOT NULL,
    CONSTRAINT level_files_filetype_check CHECK ((filetype = ANY (ARRAY['js'::text, 'css'::text])))
);


ALTER TABLE public.level_files OWNER TO neondb_owner;

--
-- Name: level_files_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.level_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.level_files_id_seq OWNER TO neondb_owner;

--
-- Name: level_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.level_files_id_seq OWNED BY public.level_files.id;


--
-- Name: level_hints; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.level_hints (
    id integer NOT NULL,
    levelid integer NOT NULL,
    name character varying(255) NOT NULL,
    content text NOT NULL
);


ALTER TABLE public.level_hints OWNER TO neondb_owner;

--
-- Name: level_hints_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.level_hints_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.level_hints_id_seq OWNER TO neondb_owner;

--
-- Name: level_hints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.level_hints_id_seq OWNED BY public.level_hints.id;


--
-- Name: level_tests; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.level_tests (
    id integer NOT NULL,
    levelid integer NOT NULL,
    name character varying(255) NOT NULL,
    type text NOT NULL,
    code text NOT NULL
);


ALTER TABLE public.level_tests OWNER TO neondb_owner;

--
-- Name: level_tests_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.level_tests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.level_tests_id_seq OWNER TO neondb_owner;

--
-- Name: level_tests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.level_tests_id_seq OWNED BY public.level_tests.id;


--
-- Name: levels; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.levels (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    objectives text NOT NULL,
    expiration timestamp without time zone,
    previouslevelid integer,
    enhanceddescription text DEFAULT 'This is an enhaced description about this level, involving multiple aspects of the WCAG guidelines and Web Development. \n\n The first lesson is on the basics of WCAG such as aria lables and screen readers'::text NOT NULL
);


ALTER TABLE public.levels OWNER TO neondb_owner;

--
-- Name: levels_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.levels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.levels_id_seq OWNER TO neondb_owner;

--
-- Name: levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.levels_id_seq OWNED BY public.levels.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    userid integer NOT NULL,
    postid integer,
    commentid integer,
    datetime timestamp without time zone NOT NULL
);


ALTER TABLE public.likes OWNER TO neondb_owner;

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.likes_id_seq OWNER TO neondb_owner;

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: post_files; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.post_files (
    id integer NOT NULL,
    postid integer NOT NULL,
    name character varying(50) NOT NULL,
    filetype text NOT NULL,
    content text NOT NULL,
    CONSTRAINT post_files_filetype_check CHECK ((filetype = ANY (ARRAY['js'::text, 'css'::text])))
);


ALTER TABLE public.post_files OWNER TO neondb_owner;

--
-- Name: post_files_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.post_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_files_id_seq OWNER TO neondb_owner;

--
-- Name: post_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.post_files_id_seq OWNED BY public.post_files.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    userid integer NOT NULL,
    levelid integer NOT NULL,
    datetime timestamp without time zone NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL
);


ALTER TABLE public.posts OWNER TO neondb_owner;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_id_seq OWNER TO neondb_owner;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: saved_files; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.saved_files (
    id integer NOT NULL,
    userid integer NOT NULL,
    levelid integer,
    name character varying(50) NOT NULL,
    filetype text NOT NULL,
    content text NOT NULL,
    datetime timestamp without time zone NOT NULL,
    CONSTRAINT saved_files_filetype_check CHECK ((filetype = ANY (ARRAY['js'::text, 'css'::text])))
);


ALTER TABLE public.saved_files OWNER TO neondb_owner;

--
-- Name: saved_files_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.saved_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saved_files_id_seq OWNER TO neondb_owner;

--
-- Name: saved_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.saved_files_id_seq OWNED BY public.saved_files.id;


--
-- Name: user_levels; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_levels (
    id integer NOT NULL,
    userid integer NOT NULL,
    levelid integer NOT NULL,
    datetime timestamp without time zone NOT NULL
);


ALTER TABLE public.user_levels OWNER TO neondb_owner;

--
-- Name: user_levels_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_levels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_levels_id_seq OWNER TO neondb_owner;

--
-- Name: user_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_levels_id_seq OWNED BY public.user_levels.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: level_files id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_files ALTER COLUMN id SET DEFAULT nextval('public.level_files_id_seq'::regclass);


--
-- Name: level_hints id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_hints ALTER COLUMN id SET DEFAULT nextval('public.level_hints_id_seq'::regclass);


--
-- Name: level_tests id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_tests ALTER COLUMN id SET DEFAULT nextval('public.level_tests_id_seq'::regclass);


--
-- Name: levels id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.levels ALTER COLUMN id SET DEFAULT nextval('public.levels_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: post_files id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.post_files ALTER COLUMN id SET DEFAULT nextval('public.post_files_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: saved_files id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.saved_files ALTER COLUMN id SET DEFAULT nextval('public.saved_files_id_seq'::regclass);


--
-- Name: user_levels id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_levels ALTER COLUMN id SET DEFAULT nextval('public.user_levels_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.comments (id, postid, userid, datetime, message) FROM stdin;
1	1	29	2025-02-26 00:05:54.521277	test
2	1	29	2025-02-26 00:16:25.291679	This is a longer comment about some of the code in the post. I think its very good but could do with some improvements!
3	1	29	2025-02-26 00:24:03.995729	test 2
4	1	29	2025-02-26 00:25:43.841572	test
5	1	29	2025-02-26 13:58:01.245773	this is a new comment
6	1	29	2025-02-26 14:04:39.700322	This is another new comment for this post
7	1	29	2025-02-26 14:05:00.191649	test like
8	1	29	2025-02-26 14:08:12.04995	test
9	1	29	2025-02-26 15:42:37.199407	this is a test
10	1	29	2025-02-26 15:43:18.101175	Final comment
\.


--
-- Data for Name: level_files; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.level_files (id, levelid, name, filetype, content, readonly) FROM stdin;
5	6	App.js	js	export default function App() {\\n    return <h1>Hello world</h1>\\n}	f
6	6	styles.css	css	h1 {\\n    color: red;\\n}	f
7	7	App.js	js	import { useState, useRef } from "react";\r\n\r\nfunction Modal(props) {\r\n    const { isOpen, onClose } = props;\r\n    // TODO: Add focus management logic when the modal is open\r\n\r\n    if (!isOpen) return null;\r\n\r\n    return (\r\n        <div className="modal-overlay" role="dialog" aria-modal="true">\r\n            <div className="modal-content">\r\n                <h2>Accessible Modal</h2>\r\n                <p>Press Escape to close or use Tab to navigate.</p>\r\n                <button onClick={onClose}>Close Modal</button>\r\n            </div>\r\n        </div>\r\n    );\r\n}\r\n\r\nexport default function App() {\r\n    const [isModalOpen, setModalOpen] = useState(false);\r\n\r\n    function openModal() {\r\n        setModalOpen(true);\r\n    }\r\n\r\n    function closeModal() {\r\n        setModalOpen(false);\r\n        // TODO: Restore focus to the opening button after closing the modal\r\n    }\r\n\r\n    //TODO manage keyboard navigation\r\n\r\n    return (\r\n        <div className="app">\r\n            <button onClick={openModal}>\r\n                Open Modal\r\n            </button>\r\n            <Modal isOpen={isModalOpen} onClose={closeModal} />\r\n        </div>\r\n    );\r\n}\r\n	f
8	7	styles.css	css	body {\r\n    font-family: Arial, sans-serif;\r\n}\r\n\r\n.app {\r\n    text-align: center;\r\n    padding: 50px;\r\n}\r\n\r\nbutton {\r\n    padding: 10px 15px;\r\n    font-size: 16px;\r\n    cursor: pointer;\r\n}\r\n\r\n.modal-overlay {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.modal-content {\r\n    background: white;\r\n    padding: 20px;\r\n    border-radius: 8px;\r\n    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\r\n    width: 300px;\r\n    text-align: center;\r\n}\r\n	t
10	8	styles.css	css	body {\r\n    font-family: Arial, sans-serif;\r\n    margin: 0;\r\n    padding: 20px;\r\n}\r\n\r\n.app {\r\n    max-width: 400px;\r\n    margin: 0 auto;\r\n}\r\n\r\n.form-group {\r\n    margin-bottom: 15px;\r\n}\r\n\r\nlabel {\r\n    display: block;\r\n    margin-bottom: 5px;\r\n}\r\n\r\ninput {\r\n    width: 100%;\r\n    padding: 8px;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.error {\r\n    color: red;\r\n    margin-bottom: 10px;\r\n    font-weight: bold;\r\n}\r\n	t
11	8	App.js	js	import { useState } from "react";\r\n\r\nfunction LoginForm() {\r\n    const [email, setEmail] = useState("");\r\n    const [password, setPassword] = useState("");\r\n    const [error, setError] = useState("");\r\n\r\n    function handleSubmit(event) {\r\n        event.preventDefault();\r\n        // TODO: Validate the form fields. If invalid, set an error message.\r\n    }\r\n\r\n    return (\r\n        <form onSubmit={handleSubmit} noValidate>\r\n            {/* TODO: Associate each input with a label */}\r\n            <div className="form-group">\r\n                <label>Email:</label>\r\n                <input\r\n                    id="email"\r\n                    name="email"\r\n                    type="email"\r\n                    value={email}\r\n                    onChange={(e) => setEmail(e.target.value)}\r\n                />\r\n            </div>\r\n            <div className="form-group">\r\n                <label>Password:</label>\r\n                <input\r\n                    id="password"\r\n                    name="password"\r\n                    type="password"\r\n                    value={password}\r\n                    onChange={(e) => setPassword(e.target.value)}\r\n                />\r\n            </div>\r\n            {/*//TODO display error to user using appropriate role*/}\r\n            <button type="submit">Login</button>\r\n        </form>\r\n    );\r\n}\r\n\r\nexport default function App() {\r\n    return (\r\n        <div className="app">\r\n            <h1>Accessible Login Form</h1>\r\n            <LoginForm />\r\n        </div>\r\n    );\r\n}\r\n\r\n	f
12	9	App.js	js	export default function App() {\r\n    return (\r\n        <div className="app">\r\n            <h1 className="title">Color Contrast Challenge</h1>\r\n            <button className="custom-button">{"Toggle High Contrast"}</button>\r\n        </div>\r\n    );\r\n}\r\n	f
13	9	styles.css	css	body {\r\n    font-family: Arial, sans-serif;\r\n}\r\n\r\n.app {\r\n    text-align: center;\r\n    padding: 50px;\r\n}\r\n\r\n.custom-button {\r\n    background-color: lightgray;\r\n    color: white;\r\n    border: none;\r\n    padding: 10px 20px;\r\n    font-size: 16px;\r\n    cursor: pointer;\r\n}\r\n\r\n.title {\r\n    color: #cccccc;\r\n}\r\n	f
16	10	App.js	js	export default function App() {\r\n\r\n    return (\r\n        <div>\r\n            <nav className="navbar">\r\n                <ul>\r\n                    <li><a href="#home">Home</a></li>\r\n                    <li><a href="#about">About</a></li>\r\n                    <li><a href="#contact">Contact</a></li>\r\n                </ul>\r\n            </nav>\r\n            <main>\r\n                <h1>Welcome to Our Site</h1>\r\n                <label htmlFor="main-input">Here is some content you can skip to.</label>\r\n                <input title="main-input" id="main-input" name="main-input" placeholder="skip to this input"></input>\r\n            </main>\r\n        </div>\r\n    )\r\n}\r\n	f
17	10	styles.css	css	body {\r\n  font-family: Arial, sans-serif;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.navbar {\r\n  background-color: #333;\r\n  padding: 10px;\r\n}\r\n\r\n.navbar ul {\r\n  list-style: none;\r\n  padding: 0;\r\n  display: flex;\r\n  gap: 20px;\r\n}\r\n\r\n.navbar a {\r\n  color: white;\r\n  text-decoration: none;\r\n}\r\n\r\nmain {\r\n  padding: 20px;\r\n}\r\n\r\nlabel {\r\n    display: block;\r\n    margin-bottom: 5px;\r\n}	f
18	11	App.js	js	export default function App() {\r\n    return (\r\n        <div>\r\n            <div className="headerContent">\r\n                <h1>Website Title</h1>\r\n            </div>\r\n            <div className="navigationContent">\r\n                <ul>\r\n                    <li><a href="#home">Home</a></li>\r\n                    <li><a href="#about">About</a></li>\r\n                    <li><a href="#contact">Contact</a></li>\r\n                </ul>\r\n            </div>\r\n            <div className="mainContent">\r\n                <div>\r\n                    <h2>Welcome</h2>\r\n                    <p>This is the main content area.</p>\r\n                </div>\r\n            </div>\r\n            <div className="footerContent">\r\n                <p>© 2024 Company Name</p>\r\n            </div>\r\n        </div>\r\n    );\r\n}\r\n	f
19	11	styles.css	css	body, h1, h2, p, ul, li, a {\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: Arial, sans-serif;\r\n}\r\n\r\nbody {\r\n    background-color: #f4f4f4;\r\n    color: #333;\r\n    line-height: 1.6;\r\n    padding: 20px;\r\n}\r\n\r\n.headerContent, .navigationContent, .mainContent, .footerContent {\r\n    max-width: 800px;\r\n    margin: 0 auto;\r\n    padding: 20px;\r\n    background: white;\r\n    border-radius: 8px;\r\n    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.headerContent {\r\n    background: #0044cc;\r\n    color: white;\r\n    text-align: center;\r\n    padding: 20px;\r\n    font-size: 1.5rem;\r\n    font-weight: bold;\r\n}\r\n\r\n.navigationContent {\r\n    background: #eaeaea;\r\n    padding: 15px;\r\n    text-align: center;\r\n    margin-top: 10px;\r\n}\r\n\r\n.navigationContent ul {\r\n    list-style: none;\r\n}\r\n\r\n.navigationContent ul li {\r\n    display: inline;\r\n    margin: 0 15px;\r\n}\r\n\r\n.navigationContent ul li a {\r\n    text-decoration: none;\r\n    color: #0044cc;\r\n    font-weight: bold;\r\n}\r\n\r\n.navigationContent ul li a:hover,\r\n.navigationContent ul li a:focus {\r\n    text-decoration: underline;\r\n}\r\n\r\n.mainContent {\r\n    padding: 25px;\r\n    background: white;\r\n    margin-top: 10px;\r\n}\r\n\r\nh2 {\r\n    color: #0044cc;\r\n}\r\n\r\n.footerContent {\r\n    background: #222;\r\n    color: white;\r\n    text-align: center;\r\n    padding: 15px;\r\n    margin-top: 10px;\r\n}\r\n\r\na, button {\r\n    transition: outline 0.2s ease-in-out;\r\n}\r\n\r\na:focus, button:focus {\r\n    outline: 3px solid #ffcc00;\r\n    background: #fffbcc;\r\n}\r\n	t
21	12	styles.css	css	body {\r\n    font-family: Arial, sans-serif;\r\n    background-color: #f5f5f5;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n.container {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    height: 100vh;\r\n}\r\n\r\n.navbar {\r\n    position: relative;\r\n    background: white;\r\n    padding: 10px;\r\n    border-radius: 8px;\r\n    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.menu-button {\r\n    padding: 12px 20px;\r\n    font-size: 16px;\r\n    cursor: pointer;\r\n    background-color: #007bff;\r\n    color: white;\r\n    border: none;\r\n    border-radius: 5px;\r\n    transition: background 0.3s ease;\r\n}\r\n\r\n.menu-button:hover {\r\n    background-color: #0056b3;\r\n}\r\n\r\n.dropdown {\r\n    list-style: none;\r\n    padding: 0;\r\n    margin: 10px 0 0;\r\n    background: white;\r\n    border: 1px solid #ddd;\r\n    border-radius: 5px;\r\n    position: absolute;\r\n    width: 150px;\r\n    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.dropdown li {\r\n    padding: 10px;\r\n    transition: background 0.2s ease;\r\n}\r\n\r\n.dropdown li a {\r\n    text-decoration: none;\r\n    color: black;\r\n    display: block;\r\n}\r\n\r\n.dropdown li:hover {\r\n    background-color: #f0f0f0;\r\n}\r\n	t
20	12	App.js	js	import {useState} from "react";\r\n\r\nconst DropDown = ({items}) => {\r\n    const [isOpen, setIsOpen] = useState(false);\r\n\r\n    return (\r\n        <>\r\n            <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>☰ Menu</button>\r\n            {isOpen && <ul className="dropdown">\r\n                {items.map((item, index) => (\r\n                    <li key={index}><a href={"#option" + index}>{item}</a></li>\r\n                ))}\r\n            </ul>}\r\n        </>\r\n    )\r\n}\r\n\r\nexport default function App() {\r\n\r\n    const items = ["Option 1", "Option 2", "Option 3"];\r\n\r\n    return (\r\n        <div className="container">\r\n            <nav className="navbar">\r\n                <DropDown items={items}/>\r\n            </nav>\r\n        </div>\r\n    );\r\n}\r\n	f
23	13	styles.css	css	.container {\r\n    font-family: Arial, sans-serif;\r\n    text-align: center;\r\n    padding: 20px;\r\n}\r\n\r\nbutton {\r\n    margin: 10px;\r\n    padding: 10px 20px;\r\n    border: none;\r\n    cursor: pointer;\r\n    font-size: 16px;\r\n    border-radius: 5px;\r\n}\r\n\r\n.toast-container {\r\n    position: fixed;\r\n    bottom: 20px;\r\n    right: 20px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 10px;\r\n    margin-bottom: 50px;\r\n}\r\n\r\n.toast {\r\n    padding: 15px;\r\n    border-radius: 5px;\r\n    color: white;\r\n    font-size: 16px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    min-width: 250px;\r\n    max-width: 350px;\r\n    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);\r\n    outline: none;\r\n}\r\n\r\n.toast:focus {\r\n    outline: 2px solid #ffffff;\r\n}\r\n\r\n.info {\r\n    background-color: #007bff;\r\n}\r\n\r\n.success {\r\n    background-color: #28a745;\r\n}\r\n\r\n.error {\r\n    background-color: #dc3545;\r\n}\r\n\r\n.toast button {\r\n    background: none;\r\n    border: none;\r\n    color: white;\r\n    font-size: 16px;\r\n    cursor: pointer;\r\n    margin-left: 10px;\r\n}\r\n	t
34	16	/public/cat.svg	js	<?xml version="1.0" encoding="utf-8"?>\r\n<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"\r\n     y="0px" viewBox="0 0 102.78 123.1" style="enable-background:new 0 0 102.78 123.1" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;stroke:#000000;stroke-width:0.216;stroke-miterlimit:2.6131;}</style>\r\n    <g><path class="st0" d="M53.79,29.73c1.54,0,2.78,1.25,2.78,2.78s-1.25,2.78-2.78,2.78S51,34.05,51,32.52S52.25,29.73,53.79,29.73 L53.79,29.73z M58.1,118.65l0.06,0h0.31c0.48-0.01,0.57-0.06,0.94-0.3l0.36-0.23c4.77-3.01,7.04-7.46,7.57-12.92 c0.56-5.8-0.8-12.77-3.26-20.4l0,0c-0.01-0.03-0.02-0.06-0.03-0.09L57.9,62.32c-0.6,0.26-1.19,0.51-1.79,0.75 c-2.35,0.98-4.77,1.71-7.24,2.22c-2.66,0.57-5.33,0.88-8.01,0.93c-5.72,0.09-11.44-1.04-17.17-3.4l-3.65,14.36 c-0.7,2.74-1.28,5.17-1.76,7.36c-0.51,2.32-0.97,4.58-1.39,6.88c-0.21,1.13-0.33,1.75-0.45,2.38c-1.33,6.85-2.74,14.15,1.09,19.9 c1.09,1.64,2.5,2.85,4.2,3.66c1.74,0.82,3.8,1.25,6.16,1.31c0.05,0,0.09,0,0.14,0h2.79V95.37c0-1.18,0.96-2.14,2.14-2.14 c1.18,0,2.14,0.96,2.14,2.14v23.28h11.49V95.37c0-1.18,0.96-2.14,2.14-2.14c1.18,0,2.14,0.96,2.14,2.14v23.28H58.1L58.1,118.65z M14.21,1.45l8.09,7.7c6-2.42,12.05-3.72,18.15-3.78c6.12-0.05,12.26,1.16,18.43,3.77l9.05-8.46c0.86-0.8,2.2-0.76,3,0.1 c0.38,0.41,0.57,0.93,0.57,1.44h0l0.11,18.06c2.46,4.3,3.92,8.31,4.53,12.07l3.63-1.18c1.12-0.36,2.32,0.25,2.69,1.37 c0.36,1.12-0.25,2.32-1.37,2.69l-4.61,1.5c0,0.1,0,0.2-0.01,0.29c-0.08,3.19-0.8,6.16-2.04,8.95l2.92,0.39 c1.17,0.15,1.99,1.22,1.84,2.39c-0.15,1.17-1.22,1.99-2.39,1.84l-4.59-0.61c-0.29,0.44-0.6,0.87-0.92,1.3 c-2.73,3.67-5.99,6.62-9.57,8.89l6.42,23.33h0c2.62,8.14,4.06,15.66,3.44,22.1c-0.49,5.13-2.25,9.56-5.69,13.05h10.46h0.11v0.01 c6.98,0,12.4,0,17.7-5.14c3.08-2.98,4.37-6.8,4.26-10.6c-0.06-2.08-0.55-4.17-1.39-6.13c-0.85-1.97-2.05-3.79-3.54-5.33 c-2.92-3.01-6.97-4.97-11.68-4.83c-1.17,0.03-2.15-0.89-2.19-2.07c-0.03-1.17,0.89-2.15,2.07-2.19c6-0.18,11.15,2.29,14.85,6.11 c1.87,1.93,3.36,4.19,4.4,6.62c1.04,2.43,1.65,5.06,1.72,7.7c0.15,4.93-1.53,9.88-5.54,13.77c-6.55,6.34-12.71,6.34-20.67,6.34 v0.01h-0.11H58.56l-0.2,0h-9.12c-0.17,0.04-0.35,0.07-0.53,0.07c-0.18,0-0.36-0.02-0.53-0.07h-14.7c-0.17,0.04-0.35,0.07-0.53,0.07 c-0.18,0-0.36-0.02-0.53-0.07h-4.4c-0.08,0-0.15,0-0.23-0.01c-2.97-0.07-5.61-0.63-7.89-1.71c-2.41-1.14-4.4-2.85-5.94-5.16 c-4.79-7.2-3.21-15.37-1.72-23.05c0.19-0.96,0.37-1.91,0.45-2.34c0.42-2.3,0.89-4.61,1.43-7.03c0.56-2.54,1.15-5.01,1.78-7.49 l3.91-15.37c-4.32-2.53-7.98-5.91-10.53-10.02C9.14,50.51,9,50.28,8.87,50.06l-3.45,0.43c-1.17,0.14-2.23-0.69-2.38-1.86 c-0.14-1.17,0.69-2.23,1.86-2.38l2.05-0.25c-1.08-2.92-1.64-6.11-1.59-9.53l-3.78-1.23c-1.12-0.36-1.73-1.57-1.37-2.69 c0.36-1.12,1.57-1.73,2.69-1.37l2.85,0.93c0.6-3.71,1.9-7.65,4.02-11.8l0.84-17.41c0.06-1.17,1.05-2.08,2.23-2.03 C13.38,0.89,13.85,1.11,14.21,1.45L14.21,1.45L14.21,1.45z M20.37,13.2l-5.73-5.45l-0.64,13.21l0,0c-0.01,0.3-0.09,0.6-0.24,0.88 c-2.16,4.13-3.41,8.01-3.89,11.6l13.38,4.34c1.12,0.36,1.73,1.57,1.37,2.69c-0.36,1.12-1.57,1.73-2.69,1.37L9.66,37.85 c0.11,2.74,0.7,5.28,1.67,7.59l11.01-1.37c1.17-0.14,2.23,0.69,2.38,1.86c0.14,1.17-0.69,2.24-1.86,2.38l-9.3,1.16 c2.23,3.2,5.31,5.85,8.89,7.87c4.01,2.26,8.65,3.72,13.5,4.28c4.29,0.5,8.72,0.28,12.99-0.71c1.64-0.4,3.28-0.91,4.92-1.53 c5.15-2.03,9.86-5.33,13.55-10.06l-7.62-1.02c-1.17-0.15-1.99-1.22-1.84-2.39c0.15-1.17,1.22-1.99,2.39-1.84l9.64,1.29 c1.18-2.28,1.93-4.68,2.16-7.24l-11.42,3.7c-1.12,0.36-2.32-0.25-2.69-1.37c-0.36-1.12,0.25-2.32,1.37-2.69l12.63-4.1 c-0.47-3.57-1.88-7.47-4.38-11.75h0c-0.18-0.31-0.29-0.68-0.29-1.07L67.28,7.11l-6.43,6.02c-0.61,0.64-1.58,0.85-2.43,0.47 c-6.02-2.74-12-4.01-17.94-3.96c-5.94,0.05-11.87,1.43-17.8,3.98l0,0C21.92,13.94,21.01,13.8,20.37,13.2L20.37,13.2z M37.54,39.46 c-1.18,0-2.14-0.96-2.14-2.14s0.96-2.14,2.14-2.14h6.61c1.18,0,2.14,0.96,2.14,2.14s-0.96,2.14-2.14,2.14h-1.2 c0.08,1.25,0.3,2.35,0.63,3.28c0.49,1.4,1.23,2.42,2.12,3.07c0.87,0.64,1.91,0.97,3.03,0.99c0.86,0.02,1.77-0.14,2.71-0.47 c1.11-0.39,2.33,0.19,2.72,1.3c0.39,1.11-0.19,2.33-1.3,2.72c-1.41,0.5-2.83,0.74-4.22,0.71c-2-0.04-3.87-0.63-5.46-1.81 c-0.79-0.59-1.51-1.31-2.13-2.17c-0.55,0.89-1.2,1.59-1.95,2.15c-2.49,1.85-5.65,1.86-9.07,1.38c-1.17-0.16-1.98-1.24-1.82-2.4 c0.16-1.17,1.24-1.98,2.4-1.82c2.44,0.34,4.61,0.41,5.93-0.58c1.2-0.9,1.98-2.8,2.09-6.35H37.54L37.54,39.46z M28.12,29.73 c1.54,0,2.78,1.25,2.78,2.78s-1.25,2.78-2.78,2.78c-1.54,0-2.78-1.25-2.78-2.78S26.58,29.73,28.12,29.73L28.12,29.73z"/></g></svg>\r\n<!-- https://uxwing.com/cat-animal-icon/-->\r\n	t
32	16	App.js	js	export default function App() {\r\n    return (\r\n        <div>\r\n            <div className="header">Welcome to the Site</div>\r\n            <nav>\r\n                <ul>\r\n                    <li><span>Home</span></li>\r\n                    <li><span>About</span></li>\r\n                    <li><span>Contact</span></li>\r\n                </ul>\r\n            </nav>\r\n            <div className="main-content">\r\n                <h3>Main Heading</h3>\r\n                <p>Here is some important text.</p>\r\n                <img src="/public/cat.svg"/>\r\n                <button onClick="alert('Clicked!')">Click Me</button>\r\n            </div>\r\n            <form>\r\n                <div>\r\n                    <p>Name:</p>\r\n                    <input type="text" placeholder="Name"/>\r\n                    <p>Email:</p>\r\n                    <input type="email"/>\r\n                    <button>Submit</button>\r\n                </div>\r\n            </form>\r\n            <div className="footer">© 2025 My Website</div>\r\n        </div>\r\n    );\r\n}	f
22	13	App.js	js	import { useState, useEffect } from "react";\r\n\r\nconst Toast = ({ message, type, onClose }) => {\r\n    useEffect(() => {\r\n        const timer = setTimeout(onClose, 5000);\r\n        return () => clearTimeout(timer);\r\n    }, [onClose]);\r\n\r\n    return <div className={`toast ${type}`} data-testid={"toast-" + type}>{message}</div>;\r\n};\r\n\r\nexport default function App() {\r\n    const [toasts, setToasts] = useState([]);\r\n\r\n    const showToast = (message, type = "info") => {\r\n        setToasts([...toasts, { id: Date.now(), message, type }]);\r\n    };\r\n\r\n    return (\r\n        <div className="container">\r\n            <h1>Toast Notifications</h1>\r\n            <button onClick={() => showToast("Info message", "info")}>Show Info Toast</button>\r\n            <button onClick={() => showToast("Success message", "success")}>Show Success Toast</button>\r\n            <button onClick={() => showToast("Error message", "error")}>Show Error Toast</button>\r\n\r\n            <div className="toast-container">\r\n                {toasts.map((toast) => (\r\n                    <Toast\r\n                        key={toast.id}\r\n                        message={toast.message}\r\n                        type={toast.type}\r\n                        onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}\r\n                    />\r\n                ))}\r\n            </div>\r\n        </div>\r\n    );\r\n};\r\n	f
25	14	styles.css	css	table {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n}\r\n\r\nth, td {\r\n    border: 1px solid #ccc;\r\n    padding: 8px;\r\n    text-align: left;\r\n}\r\n\r\nth {\r\n    background-color: #f4f4f4;\r\n}\r\n	t
24	14	App.js	js	export default function App() {\r\n    return (\r\n        <table>\r\n            <thead>\r\n            <tr>\r\n                <td></td>\r\n                <th>Monday</th>\r\n                <th>Tuesday</th>\r\n                <th>Wednesday</th>\r\n                <th>Thursday</th>\r\n                <th>Friday</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr>\r\n                <th>09:00 – 11:00</th>\r\n                <td>Closed</td>\r\n                <td>Open</td>\r\n                <td>Open</td>\r\n                <td>Closed</td>\r\n                <td>Closed</td>\r\n            </tr>\r\n            <tr>\r\n                <th>11:00 – 13:00</th>\r\n                <td>Open</td>\r\n                <td>Open</td>\r\n                <td>Closed</td>\r\n                <td>Closed</td>\r\n                <td>Closed</td>\r\n            </tr>\r\n            <tr>\r\n                <th>13:00 – 16:00</th>\r\n                <td>Closed</td>\r\n                <td>Closed</td>\r\n                <td>Open</td>\r\n                <td>Open</td>\r\n                <td>Open</td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n    );\r\n};	f
27	15	styles.css	css	.container {\r\n    text-align: center;\r\n    font-family: Arial, sans-serif;\r\n}\r\n\r\n.gallery {\r\n    display: flex;\r\n    gap: 10px;\r\n    justify-content: center;\r\n    margin-top: 20px;\r\n}\r\n\r\n.gallery img {\r\n    width: 200px;\r\n    border: 2px solid #ddd;\r\n    cursor: pointer;\r\n}\r\n\r\n.video-container {\r\n    margin-top: 20px;\r\n}\r\n	t
28	15	/public/react.svg	js	<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">\r\n    <title>React Logo</title>\r\n    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>\r\n    <g stroke="#61dafb" stroke-width="1" fill="none">\r\n        <ellipse rx="11" ry="4.2"/>\r\n        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>\r\n        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>\r\n    </g>\r\n</svg>	t
29	15	/public/node.svg	js	<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" preserveAspectRatio="xMidYMid">\r\n    <g transform="matrix(.217946 0 0 .217946 4.120542 14.085548)">\r\n        <path d="M471.05 51.6c-1.245 0-2.455.257-3.526.863l-33.888 19.57c-2.193 1.263-3.526 3.65-3.526 6.188v39.07c0 2.537 1.333 4.92 3.526 6.187l8.85 5.1c4.3 2.12 5.886 2.086 7.843 2.086 6.366 0 10-3.863 10-10.577V81.542c0-.545-.472-.935-1.007-.935h-4.245c-.544 0-1.007.4-1.007.935v38.565c0 2.976-3.1 5.97-8.13 3.454l-9.2-5.396c-.325-.177-.576-.5-.576-.863v-39.07c0-.37.248-.748.576-.935l33.817-19.5c.317-.182.694-.182 1.007 0l33.817 19.5c.322.193.576.553.576.935v39.07c0 .373-.187.755-.504.935l-33.888 19.5c-.3.173-.7.173-1.007 0l-8.706-5.18c-.26-.152-.613-.14-.863 0-2.403 1.362-2.855 1.52-5.108 2.302-.555.193-1.4.494.288 1.44l11.368 6.7c1.082.626 2.288.935 3.526.935 1.255 0 2.443-.3 3.526-.935l33.888-19.5c2.193-1.276 3.526-3.65 3.526-6.187v-39.07c0-2.538-1.333-4.92-3.526-6.188l-33.888-19.57c-1.062-.606-2.28-.863-3.526-.863zm9.066 27.918c-9.65 0-15.397 4.107-15.397 10.936 0 7.4 5.704 9.444 14.966 10.36 11.08 1.085 11.944 2.712 11.944 4.893 0 3.783-3.016 5.396-10.145 5.396-8.956 0-10.925-2.236-11.584-6.7-.078-.478-.446-.863-.935-.863h-4.4a1.03 1.03 0 0 0-1.007 1.007c0 5.703 3.102 12.447 17.916 12.447 10.723 0 16.908-4.2 16.908-11.584 0-7.3-4.996-9.273-15.397-10.65-10.5-1.4-11.512-2.07-11.512-4.533 0-2.032.85-4.75 8.634-4.75 6.953 0 9.523 1.5 10.577 6.188.092.44.48.8.935.8h4.4c.27 0 .532-.166.72-.36.184-.207.314-.44.288-.72-.68-8.074-6.064-11.872-16.908-11.872z"\r\n              fill="#83cd29"/>\r\n        <path d="M271.82.383a2.18 2.18 0 0 0-1.079.288 2.18 2.18 0 0 0-1.079 1.871v55.042c0 .54-.252 1.024-.72 1.295a1.5 1.5 0 0 1-1.511 0l-8.994-5.18a4.31 4.31 0 0 0-4.317 0L218.218 74.42c-1.342.774-2.16 2.264-2.16 3.813v41.443a4.31 4.31 0 0 0 2.159 3.741l35.903 20.722a4.3 4.3 0 0 0 4.317 0l35.903-20.722a4.31 4.31 0 0 0 2.159-3.741V16.356c0-1.572-.858-3.047-2.23-3.813L272.9.598c-.336-.187-.708-.22-1.08-.216zM40.86 52.115c-.685.028-1.328.147-1.943.504L3.015 73.34a4.3 4.3 0 0 0-2.158 3.741L.93 132.7c0 .774.4 1.492 1.08 1.87.667.4 1.494.4 2.158 0l21.297-12.232c1.35-.8 2.23-2.196 2.23-3.74V92.623c0-1.55.815-2.97 2.16-3.74l9.066-5.252a4.25 4.25 0 0 1 2.158-.576 4.24 4.24 0 0 1 2.159.576L52.3 88.88c1.343.77 2.158 2.192 2.158 3.74v25.974c0 1.546.9 2.95 2.23 3.74l21.297 12.232c.67.4 1.495.4 2.158 0 .66-.38 1.08-1.097 1.08-1.87l.072-55.617a4.28 4.28 0 0 0-2.158-3.741L43.235 52.618c-.607-.356-1.253-.476-1.943-.504h-.43zm322.624.504a4.29 4.29 0 0 0-2.159.576l-35.903 20.722c-1.34.775-2.16 2.192-2.16 3.74V119.1c0 1.558.878 2.97 2.23 3.74l35.615 20.3c1.315.75 2.92.807 4.245.07l21.585-12.016c.685-.38 1.148-1.09 1.15-1.87s-.403-1.482-1.08-1.87l-36.12-20.722c-.676-.386-1.15-1.167-1.15-1.943V91.83c0-.774.48-1.484 1.15-1.87l11.224-6.476c.668-.386 1.488-.386 2.16 0L375.5 89.96a2.15 2.15 0 0 1 1.079 1.87v10.217a2.15 2.15 0 0 0 1.079 1.87c.673.388 1.488.39 2.16 0L401.33 91.4c1.335-.776 2.16-2.197 2.16-3.74v-10a4.32 4.32 0 0 0-2.159-3.741l-35.687-20.722a4.28 4.28 0 0 0-2.159-.576zm-107.35 30.94a1.21 1.21 0 0 1 .576.143l12.303 7.123c.334.193.576.55.576.935v14.246c0 .387-.24.743-.576.935l-12.303 7.123c-.335.19-.744.19-1.08 0l-12.303-7.123c-.335-.193-.576-.55-.576-.935V91.758c0-.386.242-.74.576-.935l12.303-7.122c.168-.097.316-.143.504-.143v-.001z"\r\n              fill="#404137"/>\r\n        <path d="M148.714 52.402a4.31 4.31 0 0 0-2.16.576l-35.903 20.65c-1.342.774-2.158 2.265-2.158 3.813v41.443a4.3 4.3 0 0 0 2.158 3.74l35.903 20.722a4.3 4.3 0 0 0 4.317 0l35.903-20.722a4.31 4.31 0 0 0 2.159-3.741V77.44c0-1.55-.816-3.04-2.16-3.813l-35.903-20.65a4.27 4.27 0 0 0-2.16-.576zm214.7 36.983c-.143 0-.302 0-.432.07l-6.907 4.03a.84.84 0 0 0-.432.719v7.915c0 .298.173.57.432.72l6.907 3.957a.75.75 0 0 0 .79 0l6.907-3.957c.256-.147.432-.422.432-.72v-7.915c0-.298-.175-.57-.432-.72l-6.907-4.03c-.128-.076-.216-.07-.36-.07z"\r\n              fill="#83cd29"/>\r\n    </g>\r\n</svg>	t
30	15	/public/next.svg	js	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80">\r\n    <path fill="#000"\r\n          d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/>\r\n    <path fill="#000"\r\n          d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/>\r\n</svg>\r\n	t
31	15	/public/captions.vtt	js	WEBVTT\r\n\r\n00:00:00.000 --> 00:00:01.500\r\n[Narrator] A large rabbit climbs out of a hole.\r\n\r\n00:00:01.500 --> 00:00:04.000\r\nThe rabbit does a big yawn.\r\n\r\n00:00:04.000 --> 00:00:05.000\r\nIt then scratches his head.\r\n	t
26	15	App.js	js	import React from "react";\r\nimport "./styles.css";\r\n\r\nconst ImageGallery = () => {\r\n    const images = [\r\n        { src: "/public/react.svg"},\r\n        { src: "/public/node.svg"},\r\n        { src: "/public/next.svg"}\r\n    ];\r\n\r\n    return (\r\n        <div className="gallery">\r\n            {images.map((image, index) => (\r\n                <img key={index} src={image.src} />\r\n            ))}\r\n        </div>\r\n    );\r\n};\r\n\r\nconst VideoPlayer = () => {\r\n    return (\r\n        <div className="video-container">\r\n            <video data-testid="video" controls>\r\n                <source data-testid="source" src="https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4" type="video/mp4" />\r\n            </video>\r\n        </div>\r\n    );\r\n};\r\n\r\nexport default function App() {\r\n    return (\r\n        <div className="container">\r\n            <h1>Media Gallery</h1>\r\n            <ImageGallery />\r\n            <VideoPlayer />\r\n        </div>\r\n    );\r\n}\r\n	f
33	16	styles.css	css	.header {\r\n    font-size: 30px;\r\n    color: #888;\r\n}\r\n\r\n.main-content {\r\n    background: red;\r\n}\r\n\r\n.footer {\r\n    font-size: 10px;\r\n}\r\n\r\nimg {\r\n  width: 50px;\r\n}\r\n	f
35	17	App.js	js	import {useRef, useEffect} from 'react';\r\n\r\nexport default function App() {\r\n\r\n    const chartRef = useRef(null);\r\n\r\n    useEffect(() => {\r\n        const canvas = chartRef.current;\r\n        const ctx = canvas?.getContext("2d");\r\n\r\n        ctx.fillStyle = "#f0f0f0";\r\n        ctx.fillRect(0, 0, canvas.width, canvas.height);\r\n\r\n        ctx.fillStyle = "red";\r\n        ctx.fillRect(50, 50, 100, 100);\r\n\r\n        ctx.fillStyle = "blue";\r\n        ctx.beginPath();\r\n        ctx.arc(200, 100, 50, 0, Math.PI * 2);\r\n        ctx.fill();\r\n\r\n        ctx.strokeStyle = "green";\r\n        ctx.lineWidth = 4;\r\n        ctx.beginPath();\r\n        ctx.moveTo(50, 200);\r\n        ctx.lineTo(250, 200);\r\n        ctx.stroke();\r\n    }, []);\r\n\r\n    return (\r\n        <div className="dashboard">\r\n            <header>\r\n                <h2>Dashboard</h2>\r\n                <button><img src="/public/settings.svg" /></button>\r\n            </header>\r\n\r\n            <div>\r\n                <ul>\r\n                    <li><a href="#analytics">View Analytics</a></li>\r\n                    <li><a href="#reports">Download Reports</a></li>\r\n                </ul>\r\n            </div>\r\n\r\n            <div>\r\n                <h3>Statistics</h3>\r\n                <p>This is a dashboard about the stats!</p>\r\n                <canvas data-testid="canvas" ref={chartRef} id="chart"></canvas>\r\n                <button>🔄</button>\r\n            </div>\r\n\r\n            <aside>\r\n                <h4>Notifications</h4>\r\n                <ul>\r\n                    <li><span>⚠</span> Alert: System Update Required</li>\r\n                    <li><span>ℹ</span> Info: New Report Available</li>\r\n                </ul>\r\n            </aside>\r\n\r\n            <div>© 2025 Dashboard</div>\r\n        </div>\r\n    );\r\n}	f
37	17	/public/settings.svg	js	<?xml version="1.0" encoding="iso-8859-1"?>\r\n<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"\r\n     xmlns:xlink="http://www.w3.org/1999/xlink"\r\n     viewBox="0 0 54 54" xml:space="preserve">\r\n<g>\r\n\t<path d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571\r\n\t\tc0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571\r\n\t\tc-0.574,0.573-1.366,0.733-2.114,0.421C33.447,9.313,33,8.644,33,7.832V2.78C33,1.247,31.753,0,30.22,0H23.78\r\n\t\tC22.247,0,21,1.247,21,2.78v5.052c0,0.812-0.447,1.481-1.197,1.792c-0.748,0.313-1.54,0.152-2.114-0.421l-3.571-3.571\r\n\t\tc-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l3.572,3.571\r\n\t\tc0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h5.052\r\n\t\tc0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966\r\n\t\tc0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.572c0.574-0.573,1.363-0.731,2.114-0.42\r\n\t\tc0.75,0.311,1.197,0.98,1.197,1.792v5.052c0,1.533,1.247,2.78,2.78,2.78h6.439c1.533,0,2.78-1.247,2.78-2.78v-5.052\r\n\t\tc0-0.812,0.447-1.481,1.197-1.792c0.751-0.312,1.54-0.153,2.114,0.42l3.571,3.572c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553\r\n\t\tc0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114\r\n\t\tS45.356,33,46.168,33h5.052c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22\r\n\t\tC52,30.65,51.65,31,51.22,31h-5.052c-1.624,0-3.019,0.932-3.64,2.432c-0.622,1.5-0.295,3.146,0.854,4.294l3.572,3.571\r\n\t\tc0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-3.571-3.572c-1.149-1.149-2.794-1.474-4.294-0.854\r\n\t\tc-1.5,0.621-2.432,2.016-2.432,3.64v5.052C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-5.052\r\n\t\tc0-1.624-0.932-3.019-2.432-3.64c-0.503-0.209-1.021-0.311-1.533-0.311c-1.014,0-1.997,0.4-2.761,1.164l-3.571,3.572\r\n\t\tc-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553c-0.305-0.305-0.305-0.8,0-1.104l3.572-3.571c1.148-1.148,1.476-2.794,0.854-4.294\r\n\t\tC10.851,31.932,9.456,31,7.832,31H2.78C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h5.052\r\n\t\tc1.624,0,3.019-0.932,3.64-2.432c0.622-1.5,0.295-3.146-0.854-4.294l-3.572-3.571c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553\r\n\t\tc0.304-0.305,0.799-0.305,1.104,0l3.571,3.571c1.147,1.147,2.792,1.476,4.294,0.854C22.068,10.851,23,9.456,23,7.832V2.78\r\n\t\tC23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v5.052c0,1.624,0.932,3.019,2.432,3.64\r\n\t\tc1.502,0.622,3.146,0.294,4.294-0.854l3.571-3.571c0.306-0.305,0.801-0.305,1.104,0l4.553,4.553c0.305,0.305,0.305,0.8,0,1.104\r\n\t\tl-3.572,3.571c-1.148,1.148-1.476,2.794-0.854,4.294c0.621,1.5,2.016,2.432,3.64,2.432h5.052C51.65,23,52,23.35,52,23.78V30.22z"/>\r\n    <path d="M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7\r\n\t\ts7,3.141,7,7S30.859,34,27,34z"/>\r\n</g>\r\n</svg>\r\n\r\n        <!-- https://www.svgrepo.com/svg/13688/settings-->\r\n\r\n	t
36	17	styles.css	css	body {\r\n    font-family: Arial, sans-serif;\r\n}\r\n\r\nbutton {\r\n    background: none;\r\n    border: none;\r\n}\r\n\r\np {\r\n    color: #888;\r\n}\r\n\r\ncanvas {\r\n    width: 300px;\r\n    height: 150px;\r\n}\r\n\r\nimg {\r\n    width: 20px;\r\n}\r\n	f
\.


--
-- Data for Name: level_hints; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.level_hints (id, levelid, name, content) FROM stdin;
\.


--
-- Data for Name: level_tests; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.level_tests (id, levelid, name, type, code) FROM stdin;
1	6	App Structure Test Suite	jest	import React from 'react';\\nimport { screen, render } from '@testing-library/react';\\nimport '@testing-library/jest-dom';\\nimport App from './App';\\n\\nit('Expect text I love WCAG! on screen', () => {\\n    render(<App />);\\n    expect(screen.getByText('I love WCAG!')).toBeInTheDocument();\\n});\\n\\nit('Expect minimum number of elements to be displayed - 5', () => {\\n    render(<App />);\\n    expect(document.querySelectorAll("*")).toHaveLength(5);\\n});\\n\\nit('Expect element to be h1', () => {\\n    render(<App />);\\n    expect(document.querySelectorAll("h1")).toHaveLength(1);\\n});
5	7	App Structure Test Suite	jest	import React from 'react';\r\nimport { render, screen, fireEvent } from "@testing-library/react";\r\nimport '@testing-library/jest-dom';\r\nimport App from "./App";\r\n\r\nit('Correct elements shown when Modal closed and opened', () => {\r\n    render(<App />);\r\n    const openButton = screen.getByText("Open Modal");\r\n    expect(openButton).toBeInTheDocument();\r\n    expect(screen.queryByText("Close Modal")).not.toBeInTheDocument();\r\n    expect(screen.queryByText("Accessible Modal")).not.toBeInTheDocument();\r\n    expect(screen.queryByText("Press Escape to close or use Tab to navigate.")).not.toBeInTheDocument();\r\n\r\n    fireEvent.click(openButton);\r\n\r\n    const closeButton = screen.getByText("Close Modal");\r\n    expect(closeButton).toBeInTheDocument();\r\n    expect(screen.getByText("Accessible Modal")).toBeInTheDocument();\r\n    expect(screen.getByText("Press Escape to close or use Tab to navigate.")).toBeInTheDocument();\r\n\r\n    fireEvent.click(closeButton);\r\n    expect(screen.queryByText("Close Modal")).not.toBeInTheDocument();\r\n    expect(screen.queryByText("Accessible Modal")).not.toBeInTheDocument();\r\n    expect(screen.queryByText("Press Escape to close or use Tab to navigate.")).not.toBeInTheDocument();\r\n});\r\n\r\nit("Focus switches between open and close buttons correctly", () => {\r\n    render(<App />);\r\n\r\n    const openButton = screen.getByText("Open Modal");\r\n    fireEvent.click(openButton);\r\n\r\n    expect(screen.getByRole("dialog")).toBeInTheDocument();\r\n    const closeButton = screen.getByText("Close Modal");\r\n    expect(closeButton).toHaveFocus();\r\n    fireEvent.click(closeButton);\r\n\r\n    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();\r\n    expect(openButton).toHaveFocus();\r\n});\r\n
14	10	App Focus Test Suite	playwright	import { test, expect } from "@playwright/test";\r\nimport React from "react";\r\n\r\ntest("Skip link should be first item tabbed to on page and keyboard navigable", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    await page.keyboard.press("Tab");\r\n\r\n    const skipLink = page.getByText("Skip to Content");\r\n    await expect(skipLink).toBeFocused();\r\n    await expect(skipLink).toBeVisible();\r\n\r\n    await page.keyboard.press("Enter");\r\n\r\n    const mainContent = page.getByTitle("main-input")\r\n    await expect(mainContent).toBeFocused();\r\n});\r\n\r\ntest("Pressing the skip link should focus on the input field", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const skipLink = page.getByText("Skip to Content");\r\n\r\n    await skipLink.click();\r\n\r\n    const mainContent = page.getByTitle("main-input")\r\n    await expect(mainContent).toBeFocused();\r\n});\r\n
21	14	App Structure  and Functionality Test Suite	jest	import { render, screen } from "@testing-library/react";\r\nimport "@testing-library/jest-dom";\r\nimport App from "./App";\r\nimport React from 'react'\r\n\r\nit("Ensure table renders correctly with all the correct data", () => {\r\n    render(<App />);\r\n\r\n    const table = screen.getByRole("table");\r\n    expect(table).toBeInTheDocument();\r\n\r\n    const colheaders = screen.queryAllByRole("columnheader");\r\n    const rowHeaders = screen.queryAllByRole("rowheader");\r\n\r\n    const headers = colheaders.concat(rowHeaders);\r\n\r\n    expect(headers).toHaveLength(8);\r\n    expect(headers[0]).toHaveTextContent("Monday");\r\n    expect(headers[1]).toHaveTextContent("Tuesday");\r\n    expect(headers[2]).toHaveTextContent("Wednesday");\r\n    expect(headers[3]).toHaveTextContent("Thursday");\r\n    expect(headers[4]).toHaveTextContent("Friday");\r\n    expect(headers[5]).toHaveTextContent("09:00 – 11:00");\r\n    expect(headers[6]).toHaveTextContent("11:00 – 13:00");\r\n    expect(headers[7]).toHaveTextContent("13:00 – 16:00");\r\n});\r\n\r\nit("Header scopes are assigned correctly", () => {\r\n    render(<App />);\r\n\r\n    const table = screen.getByRole("table");\r\n    expect(table).toBeInTheDocument();\r\n\r\n    const columnHeaders = screen.getAllByRole("columnheader");\r\n    expect(columnHeaders).toHaveLength(5);\r\n    expect(columnHeaders[0]).toHaveTextContent("Monday");\r\n    expect(columnHeaders[1]).toHaveTextContent("Tuesday");\r\n    expect(columnHeaders[2]).toHaveTextContent("Wednesday");\r\n    expect(columnHeaders[3]).toHaveTextContent("Thursday");\r\n    expect(columnHeaders[4]).toHaveTextContent("Friday");\r\n\r\n    const rowHeaders = screen.getAllByRole("rowheader");\r\n    expect(rowHeaders).toHaveLength(3);\r\n    expect(rowHeaders[0]).toHaveTextContent("09:00 – 11:00");\r\n    expect(rowHeaders[1]).toHaveTextContent("11:00 – 13:00");\r\n    expect(rowHeaders[2]).toHaveTextContent("13:00 – 16:00");\r\n});\r\n\r\nit("Table has correct caption and is assigned to the table correctly using aria-describedby", () => {\r\n    render(<App />);\r\n\r\n    const table = screen.getByRole("table");\r\n    expect(table).toBeInTheDocument();\r\n\r\n    const caption = screen.getByText("Shop Opening Times");\r\n    expect(caption).toBeInTheDocument();\r\n\r\n    const captionRole = screen.getByRole("caption");\r\n    expect(captionRole).toBeInTheDocument();\r\n    expect(captionRole).toHaveTextContent("Shop Opening Times");\r\n\r\n    const captionId = caption.getAttribute("id");\r\n    const tableDescribedById = table.getAttribute("aria-describedby");\r\n    expect(tableDescribedById).toBe(captionId);\r\n});\r\n\r\n
23	15	App CSS Test Suite	playwright	import {test, expect} from "@playwright/test";\r\n\r\ntest("Video has captions displayed", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    await page.waitForTimeout(1000);\r\n\r\n    const video = page.locator("video");\r\n    await video.click();\r\n    await page.waitForTimeout(2000);\r\n\r\n    const captions = await page.locator("track").getAttribute("kind");\r\n    console.log(captions);\r\n    expect(captions).toBe("captions");\r\n});
6	7	App functionality Test Suite	playwright	import { test, expect } from "@playwright/test";\r\nimport React from "react";\r\n\r\ntest("User can open and close modal with Tab and Enter correctly", async ({ page }) => {\r\n\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const openButton = page.getByText("Open Modal");\r\n    await page.keyboard.press("Tab");\r\n    await expect(openButton).toBeFocused();\r\n    await page.keyboard.press("Enter");\r\n\r\n    const modal = page.locator('[role="dialog"]');\r\n    await expect(modal).toBeVisible();\r\n\r\n    await page.keyboard.press("Enter");\r\n\r\n    await expect(modal).not.toBeVisible();\r\n\r\n    await expect(openButton).toBeFocused();\r\n});\r\n\r\ntest("User can open and close modal with Tab and Enter and Escape correctly", async ({ page }) => {\r\n\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const openButton = page.getByText("Open Modal");\r\n    await page.keyboard.press("Tab");\r\n    await expect(openButton).toBeFocused();\r\n    await page.keyboard.press("Enter");\r\n\r\n    const modal = page.locator('[role="dialog"]');\r\n    await expect(modal).toBeVisible();\r\n\r\n    await page.keyboard.press("Escape");\r\n\r\n    await expect(modal).not.toBeVisible();\r\n\r\n    await expect(openButton).toBeFocused();\r\n});\r\n
7	6	App CSS Test Suite	playwright	import { test, expect } from '@playwright/test';\r\nimport React from "react";\r\n\r\ntest('Expect h1 element to be blue rgb(0, 0, 255)', async ({ page }) => {\r\n\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    await page.waitForSelector('h1');\r\n\r\n    const element = await page.locator('h1');\r\n    await expect(element).toHaveCSS('color', 'rgb(0, 0, 255)');\r\n    const classCount = await element.evaluate(el => el.classList.length);\r\n    expect(classCount).toBeLessThanOrEqual(1);\r\n    const color = await element.evaluate(el => getComputedStyle(el).color);\r\n\r\n    expect(color).toBe('rgb(0, 0, 255)');\r\n});
9	8	App Functionality Tests	jest	import React from "react";\r\nimport {fireEvent, render, screen} from "@testing-library/react";\r\nimport '@testing-library/jest-dom';\r\nimport App from "./App";\r\n\r\nit("Form renders correctly with all required components", () => {\r\n    const result = render(<App/>);\r\n    expect(screen.getByText("Accessible Login Form")).toBeInTheDocument();\r\n    expect(screen.getByText("Email:")).toBeInTheDocument();\r\n    expect(screen.getByText("Password:")).toBeInTheDocument();\r\n    expect(screen.getByText("Login")).toBeInTheDocument();\r\n    expect(result.container.querySelector('#email')).toBeInTheDocument();\r\n    expect(result.container.querySelector('#password')).toBeInTheDocument();\r\n    expect(screen.queryByRole("alert")).not.toBeInTheDocument();\r\n})\r\n\r\nit("Renders the login form with labels correctly associated with inputs", () => {\r\n    const result = render(<App/>);\r\n    const emailLabel = screen.getByText("Email:");\r\n    const passwordLabel = screen.getByText("Password:");\r\n\r\n    expect(emailLabel).toHaveAttribute("for", "email");\r\n    expect(passwordLabel).toHaveAttribute("for", "password");\r\n\r\n    expect(screen.getByLabelText("Email:")).toEqual(result.container.querySelector('#email'))\r\n    expect(screen.getByLabelText("Password:")).toEqual(result.container.querySelector('#password'))\r\n\r\n    const emailInput = screen.getByRole("textbox", {name: /email/i});\r\n    const passwordInput = screen.getByLabelText("Password:");\r\n    expect(emailInput).toBeInTheDocument();\r\n    expect(passwordInput).toBeInTheDocument();\r\n});\r\n\r\nit("Form validates email correctly with expected error message", async () => {\r\n    const result = render(<App/>);\r\n    const emailInput = result.container.querySelector('#email')\r\n    const passwordInput = result.container.querySelector('#password')\r\n    const submitButton = screen.getByRole("button", {name: /login/i});\r\n\r\n    fireEvent.change(emailInput, {target: {value: "invalidEmail"}})\r\n    fireEvent.change(passwordInput, {target: {value: "password"}});\r\n    submitButton.click();\r\n\r\n    const error = await screen.findByRole("alert");\r\n    expect(error).toHaveTextContent("Invalid Email");\r\n});\r\n\r\nit("Form validates password correctly with expected error message", () => {\r\n    const result = render(<App/>);\r\n    const emailInput = result.container.querySelector('#email')\r\n    const passwordInput = result.container.querySelector('#password')\r\n    const submitButton = screen.getByRole("button", {name: /login/i});\r\n\r\n    fireEvent.change(emailInput, {target: {value: "test@example.com"}});\r\n    fireEvent.click(submitButton);\r\n\r\n    const error = screen.getByRole("alert");\r\n    expect(error).toHaveTextContent("Invalid Password");\r\n});\r\n\r\nit("Shows no errors when input is valid", () => {\r\n    const result = render(<App/>);\r\n    const emailInput = result.container.querySelector('#email')\r\n    const passwordInput = result.container.querySelector('#password')\r\n    const submitButton = screen.getByRole("button", {name: /login/i});\r\n\r\n    fireEvent.change(emailInput, {target: {value: "test@example.com"}});\r\n    fireEvent.change(passwordInput, {target: {value: "password"}});\r\n    fireEvent.click(submitButton);\r\n\r\n    expect(screen.queryByRole("alert")).not.toBeInTheDocument();\r\n});\r\n
10	9	App Structure Test Suite	jest	import { render, screen } from "@testing-library/react";\r\nimport '@testing-library/jest-dom';\r\nimport App from "./App";\r\nimport React from "react";\r\n\r\ntest("UI should have all required elements", async () => {\r\n    render(<App />);\r\n    expect(screen.getByText("Toggle High Contrast")).toBeInTheDocument();\r\n    expect(screen.getByText("Color Contrast Challenge")).toBeInTheDocument();\r\n});\r\n
11	9	App Styles and Contrast Test Suite	playwright	import { test, expect } from "@playwright/test";\r\nimport React, {useState} from "react";\r\nimport AxeBuilder from '@axe-core/playwright';\r\n\r\ntest("Initial UI should have no colour contrast issues", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();\r\n    const filtered = accessibilityScanResults.violations.filter((item) => item.id === "color-contrast")\r\n\r\n    expect(filtered).toEqual([]);\r\n});\r\n\r\ntest("Button should toggle high contrast mode, which should be different from the original UI", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const button = page.getByText("Toggle High Contrast");\r\n    const title = await page.getByText("Color Contrast Challenge");\r\n\r\n    const titleColour = await title.evaluate(el => getComputedStyle(el).color);\r\n    const buttonBackground = await button.evaluate(el => getComputedStyle(el).backgroundColor);\r\n    const buttonColour = await button.evaluate(el => getComputedStyle(el).color);\r\n\r\n    await button.click();\r\n\r\n    const newTitleColour = await title.evaluate(el => getComputedStyle(el).color);\r\n    const newButtonBackground = await button.evaluate(el => getComputedStyle(el).backgroundColor);\r\n    const newButtonColour = await button.evaluate(el => getComputedStyle(el).color);\r\n\r\n    expect(titleColour).not.toEqual(newTitleColour);\r\n    expect(buttonBackground).not.toEqual(newButtonBackground);\r\n    expect(buttonColour).not.toEqual(newButtonColour);\r\n});\r\n\r\ntest("High contrast mode should also meet the accessibility requirements", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    await page.getByText("Toggle High Contrast").click();\r\n\r\n    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();\r\n    const filtered = accessibilityScanResults.violations.filter((item) => item.id === "color-contrast")\r\n\r\n    expect(filtered).toEqual([]);\r\n});
12	10	App Structure Test Suite	jest	import { render, screen } from "@testing-library/react";\r\nimport "@testing-library/jest-dom";\r\nimport App from "./App";\r\nimport React from 'react';\r\n\r\nit("All expected elements in structure", () => {\r\n    render(<App />);\r\n    const skipLink = screen.getByText(/Skip to Content/i);\r\n    expect(skipLink).toBeInTheDocument();\r\n    expect(screen.getByText("Home")).toBeInTheDocument();\r\n    expect(screen.getByText("About")).toBeInTheDocument();\r\n    expect(screen.getByText("Contact")).toBeInTheDocument();\r\n    expect(screen.getByText("Welcome to Our Site")).toBeInTheDocument();\r\n    expect(screen.getByText("Here is some content you can skip to.")).toBeInTheDocument();\r\n    expect(screen.getByTitle("main-input")).toBeInTheDocument();\r\n});\r\n\r\nit("App renders with the correct structure", () => {\r\n    render(<App />);\r\n\r\n    const navbar = screen.getByRole("navigation");\r\n    expect(navbar).toBeInTheDocument();\r\n\r\n    const list = screen.getByRole("list");\r\n    expect(navbar).toContainElement(list);\r\n\r\n    const listItems = screen.getAllByRole("listitem");\r\n    expect(listItems.length).toBeGreaterThan(2);\r\n\r\n    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();\r\n    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();\r\n    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();\r\n\r\n    const main = screen.getByRole("main");\r\n    expect(main).toBeInTheDocument();\r\n\r\n    const heading = screen.getByRole("heading", { level: 1, name: /welcome to our site/i });\r\n    expect(main).toContainElement(heading);\r\n\r\n    expect(screen.getByLabelText(/Here is some content you can skip to\\./i)).toBeInTheDocument();\r\n    const input = screen.getByTitle(/main-input/);\r\n\r\n    expect(input).toHaveAttribute("id", "main-input");\r\n    expect(input).toHaveAttribute("name", "main-input");\r\n});\r\n
15	11	App Structure Test Suite	jest	import {render, screen, within} from "@testing-library/react";\r\nimport "@testing-library/jest-dom";\r\nimport App from "./App";\r\nimport React from 'react';\r\n\r\nit("Correct roles to exist in document: banner, navigation, main, contentinfo", () => {\r\n    render(<App />);\r\n    expect(screen.getByRole("banner", { hidden: true })).toBeInTheDocument();\r\n    expect(screen.getByRole("navigation", { hidden: true })).toBeInTheDocument();\r\n    expect(screen.getByRole("main", { hidden: true })).toBeInTheDocument();\r\n    expect(screen.getByRole("contentinfo", { hidden: true })).toBeInTheDocument();\r\n});\r\n\r\nit("Semantic elements are used and the correct elements exist within each", () => {\r\n    const {container} = render(<App />);\r\n\r\n    const nav = container.querySelector("nav");\r\n    expect(nav).toBeInTheDocument();\r\n    const links = within(nav).getAllByRole("link")\r\n    expect(links).toHaveLength(3);\r\n    expect(links[0]).toHaveAttribute("href", "#home");\r\n    expect(links[1]).toHaveAttribute("href", "#about");\r\n    expect(links[2]).toHaveAttribute("href", "#contact");\r\n\r\n    const main = container.querySelector("main");\r\n    expect(main).toBeInTheDocument();\r\n    expect(within(main).getByText("Welcome")).toBeInTheDocument();\r\n    expect(within(main).getByText("This is the main content area.")).toBeInTheDocument();\r\n\r\n    const header = container.querySelector("header");\r\n    expect(header).toBeInTheDocument();\r\n    expect(within(header).getByText("Website Title")).toBeInTheDocument();\r\n\r\n    const footer = container.querySelector("footer");\r\n    expect(footer).toBeInTheDocument();\r\n    expect(within(footer).getByText("© 2024 Company Name")).toBeInTheDocument();\r\n});\r\n\r\nit("Semantic elements have the correct roles on them", () => {\r\n    const {container} = render(<App />);\r\n\r\n    const nav = container.querySelector("nav");\r\n    expect(nav.getAttribute("role")).toBe("navigation");\r\n\r\n    const main = container.querySelector("main");\r\n    expect(main.getAttribute("role")).toBe("main");\r\n\r\n    const header = container.querySelector("header");\r\n    expect(header.getAttribute("role")).toBe("banner");\r\n\r\n    const footer = container.querySelector("footer");\r\n    expect(footer.getAttribute("role")).toBe("contentinfo");\r\n});\r\n
16	11	App Visual Test Suite	playwright	import { test, expect } from "@playwright/test";\r\nimport { injectAxe, checkA11y } from "axe-playwright";\r\nimport React from "react";\r\nimport fs from "fs-extra";\r\nimport pixelmatch from "pixelmatch";\r\nimport { PNG } from "pngjs";\r\nimport path from "path";\r\n\r\ntest("Page has no accessibility issues due to roles", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    await injectAxe(page);\r\n    await checkA11y(page, null, { runOnly: ["wcag2a", "wcag2aa"] });\r\n});\r\n\r\n\r\ntest("Ensure page layout does not change visually", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const screenshotPath = "screenshots/Level6Page.png";\r\n    const tempScreenshotPath = path.join(__dirname , "temp-layout.png");\r\n\r\n    await page.screenshot({ path: tempScreenshotPath });\r\n\r\n    if (!fs.existsSync(screenshotPath)) {\r\n        throw new Error(`Baseline screenshot not found: ${screenshotPath}`);\r\n    }\r\n\r\n    const baselineImage = PNG.sync.read(fs.readFileSync(screenshotPath));\r\n    const newImage = PNG.sync.read(fs.readFileSync(tempScreenshotPath));\r\n\r\n    expect(baselineImage.width).toBe(newImage.width);\r\n    expect(baselineImage.height).toBe(newImage.height);\r\n\r\n    const diff = new PNG({ width: baselineImage.width, height: baselineImage.height });\r\n    const pixelDiff = pixelmatch(\r\n        baselineImage.data,\r\n        newImage.data,\r\n        diff.data,\r\n        baselineImage.width,\r\n        baselineImage.height,\r\n        { threshold: 0.1 }\r\n    );\r\n\r\n    expect(pixelDiff).toBe(0);\r\n});\r\n
17	12	App Structure Test Suite	jest	import React from "react";\r\nimport {render, screen, fireEvent} from "@testing-library/react";\r\nimport "@testing-library/jest-dom";\r\nimport App from "./App";\r\n\r\nit("Correct elements render on page initially", () => {\r\n    render(<App/>);\r\n    expect(screen.getByText("☰ Menu")).toBeInTheDocument();\r\n    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();\r\n    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();\r\n    expect(screen.queryByText("Option 3")).not.toBeInTheDocument();\r\n});\r\n\r\nit("Correct elements render on page when dropdown open", () => {\r\n    render(<App/>);\r\n    const menuButton = screen.getByText("☰ Menu");\r\n    fireEvent.click(menuButton);\r\n    expect(screen.queryByText("Option 1")).toBeInTheDocument();\r\n    expect(screen.queryByText("Option 2")).toBeInTheDocument();\r\n    expect(screen.queryByText("Option 3")).toBeInTheDocument();\r\n    fireEvent.click(menuButton);\r\n    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();\r\n    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();\r\n    expect(screen.queryByText("Option 3")).not.toBeInTheDocument();\r\n});\r\n\r\nit("Elements have correct roles and accessible names", () => {\r\n    render(<App/>);\r\n\r\n    const menuButton = screen.getByText("☰ Menu");\r\n\r\n    expect(menuButton).toBeInTheDocument();\r\n    expect(menuButton).toHaveAttribute("aria-haspopup", "true");\r\n    expect(menuButton).toHaveAttribute("aria-expanded", "false");\r\n\r\n    fireEvent.click(menuButton);\r\n    expect(menuButton).toHaveAttribute("aria-expanded", "true");\r\n\r\n    const menuItems = screen.getAllByRole("menuitem");\r\n\r\n    expect(menuItems.length).toBe(3); // Should match dropdown items\r\n\r\n    menuItems.forEach((item, index) => {\r\n        expect(item).toBeInTheDocument();\r\n        expect(item).toHaveTextContent(`Option ${index + 1}`);\r\n\r\n        const accessibleName = item.getAttribute("aria-label") || item.textContent;\r\n        expect(accessibleName).toBe(`Option ${index + 1}`);\r\n    });\r\n    fireEvent.click(menuButton);\r\n    expect(menuButton).toHaveAttribute("aria-expanded", "false");\r\n});\r\n
18	12	App Keyboard Navigation Test Suite	playwright	import { test, expect } from "@playwright/test";\r\n\r\ntest("Dropdown menu should be fully keyboard navigable", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n        `\r\n    )\r\n\r\n    const menuButton = page.getByText("☰ Menu");\r\n\r\n    await menuButton.focus();\r\n    await page.keyboard.press("Enter");\r\n\r\n    const menuItems = await page.locator("ul li a");\r\n    await expect(menuItems).toHaveCount(3);\r\n\r\n    await menuItems.nth(0).focus();\r\n    await expect(menuItems.nth(0)).toBeFocused();\r\n    await expect(menuItems.nth(0)).toHaveText(/Option 1/);\r\n\r\n    await page.keyboard.press("ArrowDown");\r\n    await expect(menuItems.nth(1)).toBeFocused();\r\n    await expect(menuItems.nth(1)).toHaveText(/Option 2/);\r\n\r\n    await page.keyboard.press("ArrowDown");\r\n    await expect(menuItems.nth(2)).toBeFocused();\r\n    await expect(menuItems.nth(2)).toHaveText(/Option 3/);\r\n\r\n    await page.keyboard.press("ArrowUp");\r\n    await expect(menuItems.nth(1)).toBeFocused();\r\n    await expect(menuItems.nth(1)).toHaveText(/Option 2/);\r\n\r\n    await page.keyboard.press("Escape");\r\n    await expect(menuButton).toBeFocused();\r\n    await expect(menuButton).toHaveAttribute("aria-expanded", "false");\r\n\r\n    await menuButton.focus();\r\n    await page.keyboard.press("Space");\r\n\r\n    const newMenuItems = await page.locator("ul li a");\r\n    await expect(newMenuItems).toHaveCount(3);\r\n});\r\n
19	13	App Structure and FunctionalityTest Suite	jest	import {render, screen, fireEvent, act} from "@testing-library/react";\r\nimport "@testing-library/jest-dom";\r\nimport App from "./App";\r\nimport React from 'react';\r\n\r\njest.useFakeTimers();\r\n\r\nit("Initial screen renders with all required elements", () => {\r\n    render(<App/>);\r\n\r\n    expect(screen.getByText("Accessible Toast Notifications")).toBeInTheDocument();\r\n    expect(screen.getByText("Show Info Toast")).toBeInTheDocument();\r\n    expect(screen.getByText("Show Success Toast")).toBeInTheDocument();\r\n    expect(screen.getByText("Show Error Toast")).toBeInTheDocument();\r\n});\r\n\r\nit("Toasts appear with correct text and elements", () => {\r\n    render(<App/>);\r\n\r\n    fireEvent.click(screen.getByText("Show Info Toast"));\r\n    expect(screen.getByText("Info message")).toBeInTheDocument();\r\n    fireEvent.click(screen.getByText("Show Success Toast"));\r\n    expect(screen.getByText("Success message")).toBeInTheDocument();\r\n    fireEvent.click(screen.getByText("Show Error Toast"));\r\n    expect(screen.getByText("Error message")).toBeInTheDocument();\r\n});\r\n\r\nit("Renders and announces an error toast with assertive aria-live and correct role", () => {\r\n    render(<App/>);\r\n\r\n    fireEvent.click(screen.getByText("Show Error Toast"));\r\n\r\n    const toast = screen.getByTestId("toast-error")\r\n    expect(toast).toBeInTheDocument();\r\n    expect(toast).toHaveTextContent("Error message");\r\n    expect(toast).toHaveAttribute("aria-live", "assertive");\r\n    expect(toast).toHaveAttribute("role", "status");\r\n});\r\n\r\nit("Renders and announces a success toast with polite aria-live and correct role", () => {\r\n    render(<App/>);\r\n\r\n    fireEvent.click(screen.getByText("Show Success Toast"));\r\n\r\n    const toast = screen.getByTestId("toast-success")\r\n    expect(toast).toBeInTheDocument();\r\n    expect(toast).toHaveTextContent("Success message");\r\n    expect(toast).toHaveAttribute("aria-live", "polite");\r\n    expect(toast).toHaveAttribute("role", "status");\r\n});\r\n\r\nit("Renders and announces an info toast with polite aria-live and correct role", () => {\r\n    render(<App/>);\r\n\r\n    fireEvent.click(screen.getByText("Show Info Toast"));\r\n\r\n    const toast = screen.getByTestId("toast-info")\r\n    expect(toast).toBeInTheDocument();\r\n    expect(toast).toHaveTextContent("Info message");\r\n    expect(toast).toHaveAttribute("aria-live", "polite");\r\n    expect(toast).toHaveAttribute("role", "status");\r\n});\r\n\r\nit("Toast can be dismissed by clicking the close button", () => {\r\n    render(<App/>);\r\n\r\n    fireEvent.click(screen.getByText("Show Info Toast"));\r\n\r\n    const toast = screen.getByTestId("toast-info")\r\n    expect(toast).toBeInTheDocument();\r\n\r\n    fireEvent.click(screen.getByText("✖"));\r\n\r\n    expect(toast).not.toBeInTheDocument();\r\n});\r\n\r\nit("Toast automatically disappears after timeout", () => {\r\n    render(<App/>);\r\n\r\n    fireEvent.click(screen.getByText("Show Success Toast"));\r\n\r\n    const toast = screen.getByTestId("toast-success")\r\n    expect(toast).toBeInTheDocument();\r\n\r\n    act(() => {\r\n        jest.runAllTimers();\r\n    });\r\n\r\n    expect(toast).not.toBeInTheDocument();\r\n});\r\n\r\nit("Toast does not take the focus when it appears on screen", () => {\r\n    render(<App/>);\r\n\r\n    fireEvent.click(screen.getByText("Show Info Toast"));\r\n\r\n    const toast = screen.getByTestId("toast-info")\r\n    expect(toast).not.toHaveFocus();\r\n});\r\n\r\n\r\n
20	13	App CSS and Keyboard Test Suite	playwright	import {test, expect} from "@playwright/test";\r\n\r\ntest("Can use keyboard to dismiss toast", async ({page}) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    await page.keyboard.press("Tab");\r\n    await page.keyboard.press("Enter");\r\n\r\n    const toast = await page.getByText("Info message");\r\n    expect(toast).toBeVisible();\r\n\r\n    await page.keyboard.press("Tab");\r\n    await page.keyboard.press("Tab");\r\n    await page.keyboard.press("Tab");\r\n\r\n    expect(toast).not.toBeVisible();\r\n\r\n    await page.keyboard.press("Enter");\r\n});\r\n\r\ntest("Toasts should be the correct colours", async ({page}) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    await page.click('text="Show Info Toast"');\r\n    const infoToast = await page.waitForSelector('[data-testid="toast-info"]');\r\n    const infoColor = await infoToast.evaluate((el) => getComputedStyle(el).backgroundColor);\r\n    expect(infoColor).toBe("rgb(0, 123, 255)");\r\n\r\n    await page.click('text="Show Success Toast"');\r\n    const successToast = await page.waitForSelector('[data-testid="toast-success"]');\r\n    const successColor = await successToast.evaluate((el) => getComputedStyle(el).backgroundColor);\r\n    expect(successColor).toBe("rgb(40, 167, 69)");\r\n\r\n    await page.click('text="Show Error Toast"');\r\n    const errorToast = await page.waitForSelector('[data-testid="toast-error"]');\r\n    const errorColor = await errorToast.evaluate((el) => getComputedStyle(el).backgroundColor);\r\n    expect(errorColor).toBe("rgb(220, 53, 69)");\r\n});\r\n
22	15	App Structure Test Suite	jest	import {render, screen, within} from "@testing-library/react";\r\nimport App from "./App";\r\nimport "@testing-library/jest-dom";\r\nimport React from 'react';\r\n\r\nit("UI render with all correct components", () => {\r\n    render(<App />);\r\n    expect(screen.getByText("Media Gallery")).toBeInTheDocument();\r\n    const images = screen.getAllByRole("img");\r\n    expect(images.length).toBe(3);\r\n    expect(images[0].getAttribute("src")).toBe("/public/react.svg")\r\n    expect(images[1].getAttribute("src")).toBe("/public/node.svg")\r\n    expect(images[2].getAttribute("src")).toBe("/public/next.svg")\r\n    const video = screen.getAllByTestId("video");\r\n    expect(video.length).toBe(1);\r\n    const source = within(video[0]).getAllByTestId("source");\r\n    expect(source.length).toBe(1);\r\n    expect(source[0].getAttribute("src")).toBe("https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4");\r\n    expect(source[0].getAttribute("type")).toBe("video/mp4");\r\n});\r\n\r\nit("All images have non-empty alt attributes and they are appropriate to the image", () => {\r\n    render(<App />);\r\n    const images = screen.getAllByRole("img");\r\n    expect(images.length).toBe(3);\r\n\r\n    expect(images[0].getAttribute("alt")).not.toBe(null);\r\n    expect(images[1].getAttribute("alt")).not.toBe(null);\r\n    expect(images[2].getAttribute("alt")).not.toBe(null);\r\n\r\n    const reactAlt = images[0].getAttribute("alt").trim().toLowerCase();\r\n    const nodeAlt = images[1].getAttribute("alt").trim().toLowerCase();\r\n    const nextAlt = images[2].getAttribute("alt").trim().toLowerCase();\r\n\r\n    const reactSim = (reactAlt.includes("react") || (reactAlt.includes("logo") || reactAlt.includes("brand"))) || reactAlt.includes("nucleus");\r\n    expect(reactSim).toBe(true);\r\n\r\n    const nodeSim = (nodeAlt.includes("node") || (nodeAlt.includes("logo") || nodeAlt.includes("brand"))) || (nodeAlt.includes("node.js"));\r\n    expect(nodeSim).toBe(true);\r\n\r\n    const nextSim = (nextAlt.includes("next") || (nextAlt.includes("logo") || nextAlt.includes("brand"))) || nextAlt.includes("next.js");\r\n    expect(nextSim).toBe(true);\r\n});\r\n\r\nit("Video description exists and is linked to video element", () => {\r\n    render(<App />);\r\n\r\n    const description = screen.getByText("This video is of a large rabbit yawning");\r\n    expect(description).toBeInTheDocument();\r\n    const descriptionId = description.getAttribute("id");\r\n\r\n    const video = screen.getByTestId("video");\r\n\r\n    expect(video).toHaveAttribute("aria-describedby", descriptionId);\r\n});\r\n\r\nit("Video has correct captions added onto it", () => {\r\n    render(<App />);\r\n    const track = screen.getByTestId("video").querySelector("track");\r\n    expect(track).toHaveAttribute("src", "/public/captions.vtt");\r\n    expect(track).toHaveAttribute("kind", "captions");\r\n    expect(track).toHaveAttribute("label", "English captions");\r\n    expect(track).toHaveAttribute("default");\r\n});\r\n\r\nit("Video has correct transcript for it", () => {\r\n    render(<App />);\r\n    expect(screen.getByText("[Narrator] A large rabbit climbs out of a hole. The rabbit does a big yawn. It then scratches his head.")).toBeInTheDocument();\r\n});\r\n
24	16	App Structure Test Suite	jest	import {render, screen} from "@testing-library/react";\r\nimport App from "./App";\r\nimport React from 'react';\r\nimport "@testing-library/jest-dom";\r\n\r\nit("renders the correct structure and text", () => {\r\n    render(<App/>);\r\n\r\n    expect(screen.getByText("Welcome to the Site")).toBeInTheDocument();\r\n\r\n    expect(screen.getByText("Home")).toBeInTheDocument();\r\n    expect(screen.getByText("About")).toBeInTheDocument();\r\n    expect(screen.getByText("Contact")).toBeInTheDocument();\r\n\r\n    expect(screen.getByRole("heading", {name: "Main Heading"})).toBeInTheDocument();\r\n    expect(screen.getByText("Here is some important text.")).toBeInTheDocument();\r\n\r\n    const image = screen.getByRole("img");\r\n    expect(image).toHaveAttribute("src", "/public/cat.svg");\r\n\r\n    expect(screen.getByRole("button", {name: "Click Me"})).toBeInTheDocument();\r\n\r\n    expect(screen.getByText("Name:")).toBeInTheDocument();\r\n    expect(screen.getByText("Email:")).toBeInTheDocument();\r\n    const inputs = screen.getAllByRole("textbox");\r\n    expect(inputs).toHaveLength(2);\r\n    expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();\r\n\r\n    expect(screen.getByText("© 2025 My Website")).toBeInTheDocument();\r\n});\r\n
25	16	App Accessibility Test Suite	playwright	import {test, expect} from "@playwright/test";\r\nimport React from "react";\r\nimport AxeBuilder from "@axe-core/playwright";\r\n\r\ntest("Ensures there are no accessibility issues on the page", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();\r\n\r\n    const results = [];\r\n\r\n    accessibilityScanResults.violations.forEach(violation => {\r\n        const nodes = violation.nodes;\r\n        nodes.forEach((node) => {\r\n            const result = node.html + " : " + node.failureSummary + " : " + violation.description;\r\n            results.push(result);\r\n        })\r\n    })\r\n\r\n    expect(results).toEqual([]);\r\n});\r\n
26	17	App Structure Test Suite	jest	import {render, screen} from "@testing-library/react";\r\nimport App from "./App";\r\nimport React from 'react';\r\nimport "@testing-library/jest-dom";\r\n\r\nbeforeAll(() => {\r\n    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({\r\n        fillRect: jest.fn(),\r\n        beginPath: jest.fn(),\r\n        arc: jest.fn(),\r\n        fill: jest.fn(),\r\n        stroke: jest.fn(),\r\n        moveTo: jest.fn(),\r\n        lineTo: jest.fn(),\r\n    }));\r\n});\r\n\r\nit("Renders the main dashboard elements correctly", () => {\r\n    render(<App />);\r\n\r\n    expect(screen.getByRole("heading", {name: "Dashboard" })).toBeInTheDocument();\r\n    const buttons = screen.getAllByRole("button");\r\n    expect(buttons.length).toBe(2);\r\n    const images = screen.getAllByRole("img");\r\n    expect(images.length).toBe(1);\r\n\r\n    expect(screen.getByRole("link", { name: "View Analytics" })).toBeInTheDocument();\r\n    expect(screen.getByRole("link", { name: "Download Reports" })).toBeInTheDocument();\r\n\r\n    expect(screen.getByRole("heading", {name: "Statistics" })).toBeInTheDocument();\r\n    expect(screen.getByText("This is a dashboard about the stats!")).toBeInTheDocument();\r\n    expect(screen.getByText("🔄")).toBeInTheDocument();\r\n\r\n    expect(screen.getByTestId("canvas")).toBeInTheDocument();\r\n\r\n    expect(screen.getByRole("heading", {name: "Notifications" })).toBeInTheDocument();\r\n    expect(screen.getByText("Alert: System Update Required")).toBeInTheDocument();\r\n    expect(screen.getByText("Info: New Report Available")).toBeInTheDocument();\r\n\r\n    expect(screen.getByText("© 2025 Dashboard")).toBeInTheDocument();\r\n});\r\n
27	17	App CSS and Accessibility Test Suite	playwright	import {test, expect} from "@playwright/test";\r\nimport React, {useEffect, useRef} from "react";\r\nimport AxeBuilder from "@axe-core/playwright";\r\n\r\ntest("Ensures there are no accessibility issues on the page and the canvas is made accessible correctly", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();\r\n\r\n    const results = [];\r\n\r\n    accessibilityScanResults.violations.forEach(violation => {\r\n        const nodes = violation.nodes;\r\n        nodes.forEach((node) => {\r\n            const result = node.html + " : " + node.failureSummary + " : " + violation.description;\r\n            results.push(result);\r\n        })\r\n    })\r\n\r\n    expect(results).toEqual([]);\r\n});\r\n
\.


--
-- Data for Name: levels; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.levels (id, name, description, objectives, expiration, previouslevelid, enhanceddescription) FROM stdin;
6	Tutorial	Introduction to the application and the basics.	1. Change the h1 element to display "I love WCAG!" \\n\\n2. Change the colour of the h1 element to be blue rgb(0, 0, 255) \\n\\n3. No other elements should be displayed	\N	\N	This is a tutorial on the basics of using the application and completing levels. \\n\\nThe Description tells you about the content of the level, the WCAG challenges being tackled and any background knowledge needed. \\n\\nThe Objectives section lays out what you must do in order to complete the level and advance to the next. \\n\\nThe code editor will render anything coded in react into the window to the right, any console outputs being displayed below that. \\n\\nHints can be viewed and using the Hint button, a maximum of three hints are allowed per level. The reset button will reset the code in the editor to the default value and cannot be undone. The Test button will run the test suites on your solution in order to check if it has passed, all results will be displayed in the test console and finally the Submit button will submit your solution.
7	Keeping Focus	This level explores the importance of focus and keyboard navigation in user interfaces	1. Ensure that when the Modal is opened focus switches onto the button on the Modal\r\n\r\n2. When the Modal is closed ensure focus is switched back to the open button\r\n\r\n3. The user should also be able to use the keyboard to carry out operations, the Escape key should close the modal, pressing Enter or Space should activate the buttons and pressing Tab should allow the user to navigate between focusable elements	\N	6	Focus Order (WCAG Reference 2.4.3) and Keyboard Navigation (WCAG Reference 2.1.1) are both very important parts of WCAG. When they are implemented badly or not at all people who are unable to use a mouse can find it very difficult or even impossible to navigate web pages.\r\n\r\nIt is important that when users carry out certain actions the focus remains/is moved to a place on the page that is relevant to the action and makes sense to the user.\r\n\r\nGoals:\r\n\r\n1. Everything can be done with a keyboard except freehand movements. Esnure pointer actions have a keyboard equivalent, as many people rely on the keyboard interface, including blind and some mobility impaired people.\r\n\r\n2. Keyboard users navigate content in a correct order. Elements receive focus in an order that preserves meaning so that navigating a website with only a keyboard make sense. \\links\\https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html,https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html
8	What's the Password?	Explores how to create accessible forms and handle validation	1. Ensure the form is accessible associating any labels and field using the htmlFor attribute\r\n\r\n2. Implement validation on the form with the following rules: email addresses must be valid and passwords must not be empty\r\n\r\n3. On submission, any errors must be displayed in an accessible way using the alert role, for this level please display "Invalid Password", "Invalid Email" respectively	\N	7	Forms make up a significant part of the Web, so ensuring they are accessible is extremely important.\r\n\r\nWe not only need to make them easy to navigate and fill in for users with accessibility needs, but also need to account for errors.\r\n\r\nThe htmlFor attribute is used to associate labels with form fields, e.g. htmlFor="fieldId", this is extremely useful for users who require screen readers or other accessibility software.\r\n\r\nRoles are used to specify what different elements are used for, in this case for form validation errors role="alert" ensures that accessibility software picks up the fact that this is important for the form validation.\r\n\r\nGoals: \\n\\n1. Users should know what information to enter. We need to provide labels and instructions for inputs, so that everyone will know hoe to respond. \\n\\n2. People using assistive technology understand all components. We need to ensure we give all components the correct names, roles, states and values as assistive technologies only work when it is coded properly
10	Skip to the Good Bit	Exploration of "skip to content" buttons and their uses in complex applications with many elements on the screen.	1. Add a button in front of the navbar with text "Skip to Content"\r\n\r\n2. When clicked this button should switch the focus to the main content of the page\r\n\r\n3. All other elements on the page must remain the same	\N	9	Bypass blocks (WCAG 2.4.1) are great for users who require the keyboard to navigate and can't easily skip around content the may be irrelevant.\r\n\r\nThe goal of this requirement is to allow users reliant on keyboard interfaces to skip repeating/irrelevant content allowing them to move around pages a lot more easily.\\links\\https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html
9	Contrasting Views	This level is about the importance of styling, colours and contrast on user interfaces.	1. Ensure that the initial UI has a high enough contrast between all elements (4.5:1).\r\n\r\n2. When the button is clicked the styling should toggle, offering a different contrast on the page.\r\n\r\n3. When the button is clicked again it should switch back to the original.	\N	8	Styling, colours and contrast play a big role in making UIs accessible.\r\n\r\nWCAG 2.2 states that the minimum contrast between two different text and other elements should be 4.5:1 with larger scale text should have a minimum contrast of 3:1.\r\n\r\nThe goal of this is so that text can be seen by more people, as people with visual impairments can struggle to read certain colours or text with too low contrasts.\\links\\https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
11	ARIA What?	It is important that users who require screen readers are able to keep track of their position on the screen... Introducing ARIA Roles	1. Update the landing page structure to use semantic HTML elements like header, nav, main and footer\r\n\r\n2. Add the correct ARIA roles to the page\r\n\r\n3. Avoid changing the actual look of the page, everything should look the exact same	\N	10	As you can see, the page is clearly set out into distinct sections, a header, navigation bar, main content and a footer.\r\n\r\nHowever, for users who require screen readers and other assistive technologies this is not obvious, as the page has been poorly programmed and uses nearly exclusively div elements.\r\n\r\nThe challenge is to update this page to make use of semantic elements and ARIA roles without changing the look of the page.\r\n\r\nKey roles to remember, particularly for this level are banner, navigation, main and contentinfo. These aren't the only ones, so when making your webpages choose appropriately.\\links\\https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html\r\n
12	Drop It!	Drop down menus are extremely common in many application, they require multiple techniques to make them accessible	1. Ensure the drop down can be navigated with the keyboard, using the up and down arrow keys\r\n\r\n2. It should be able to be opened using space or enter and closed using escape\r\n\r\n3. All elements should have the correct roles and aria attributes	\N	11	Drop down menus appear everywhere in web pages and applications, however are rarely implemented with accessibility in mind.\r\n\r\nThere are multiple elements needed to do this:\r\n\r\nKeyboard navigation support, using the correct roles on elements and making use of different aria attributes in order to maximise the effectiveness of assistive technologies.\r\n\r\nThese attributes are aria-haspopup, set to true if an element has a popup on it and aria-expanded set to true if the popup is open and false otherwise, giving users more information about the popup and its state.\\links\\https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html,https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
13	Not That Kind of Toast	Temporary popup (toast) notifications are important for delivering urgent information to users quickly and efficiently	1. Ensure that the toast messages are given the correct role and aria-live attributes for their type\r\n\r\n2. Make the toast messages keyboard accessible, once on screen they should be navigable but not take the focus initially\r\n\r\n3. Add a close button with text "✖" to the toast popups, which will remove the toast once pressed. This should be keyboard navigable and accessible	\N	12	Toast messages, or temporary popups are very useful in applications, to deliver asynchronous status messages separate from the user's current process.\r\n\r\nStatus messages are defined by 2 key features: They do not take focus when appearing. They provide information to the user on the state of the application.\r\n\r\nCurrently there are only a small number of ways to indicate if something is a status message: The use of roles like status, alert, log and the use of the aria-live attribute which can take values "polite", for info and success messages and "assertive", for error and other important messages.\r\n\r\nThese all come together to help assistive technologies process and present these messages to the user in the best way possible.\\links\\https://w3c.github.io/wcag21/understanding/status-messages.html\r\n
14	The Tables Have Turned	Tables are a great for displaying data to users, but on their own can be hard to interpret for accessible technologies.	1. Add a caption to the table "Shop Opening Times" as the data is ambiguous\r\n\r\n2. Ensure that aria-describedby is set correctly\r\n\r\n3. Ensure the row and column scopes exist and are correct	\N	13	Tables are great for displaying and contextualising data to users.\r\n\r\nIt is important that we make information about the content structure available to as many people as possible.\r\n\r\nThis is done in several ways with tables, if the data is ambiguous then the table must have a caption. This caption needs to be linked to the table using an aria-describedby attribute. Which links the table to the caption ID.\r\n\r\nHeadings on the table (<th>) also need to be given a scope attribute for whether they are a heading for a row or a column in the form scope="row" or scope="col".\\links\\https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html,https://www.w3.org/WAI/tutorials/tables/
15	Media Mogul	The internet is home to all types of media, some of the most common being images and videos, but how do we make these accessible?	1. Make the image gallery accessible by adding appropriate and unique alt text attributes to each image\r\n\r\n2. Add the captions (found in the /public/captions.vtt) file to the video using a track element\r\n\r\n3. Add a description to the video "This video is of a large rabbit yawning" using the aria-describedby attribute\r\n\r\n4. Add a <p> attribute in the video container containing the transcript of the video from the vtt file	\N	14	Some say a picture can tell a thousand words, but if you are unable to perceive the picture then all of this will be lost.\r\n\r\nWe need to make non-text information available to as many people as possible by creating text alternatives for visual and auditory content allowing it to be fully understood by people who can't fully hear or see the content.\r\n\r\nThis can be done in a number of ways, for images the alt attribute is used to explain what an image is, but understandably for videos this is more complex.\r\n\r\nVideos need captions and potentially even transcripts provided, this can be done using vtt files and the <track> tag.\r\n\r\nFinally it is also good practice to provide a short video description associated to the video element with the aria-describedby attribute.\\links\\https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html,https://www.w3schools.com/TAGs/tag_track.asp
16	The Big One	Time for a challenge, get ready to put everything you have learned so far into practice	1. Fix all the accessibility issues, for more information, run the tests and see what's wrong	\N	15	Here is the big one, time to put into practice everything you have learned so far.\r\n\r\nThis page is absolutely rubbish, with numerous accessibility issues, and you need to fix them all!\r\n\r\nGood luck :).
17	Canvasing	Solidify your skills further, while also learning how to deal with canvases.	1. Ensure all relevant elements, buttons etc, have accessible labels\r\n\r\n2. Ensure graphs and canvases have good alternative text\r\n\r\n3. Fix all other accessibility issues existing on the page	\N	16	Canvases can be used to display all kinds of information on web pages, and thus are treated similarly to images in terms of accessibility.\r\n\r\nButtons and other focusable elements without text also need to made accessible. This can be done by adding accessible text that accessibility tools can interpret.\r\n\r\nAccessible text is added to elements in the form of aria-labels. These are used to allow more people to understand what buttons and other interactive elements actually do.\\links\\https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html,https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html,https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.likes (id, userid, postid, commentid, datetime) FROM stdin;
8	29	\N	4	2025-02-26 00:25:49.748893
10	29	\N	3	2025-02-26 13:57:06.668298
11	29	\N	6	2025-02-26 14:04:48.97852
12	29	\N	7	2025-02-26 14:05:03.754484
13	29	\N	8	2025-02-26 14:43:59.124143
\.


--
-- Data for Name: post_files; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.post_files (id, postid, name, filetype, content) FROM stdin;
1	1	App.js	js	export default function App() {\n    return <h1>Hello world</h1>\n}
2	1	styles.css	css	h1 {\n    color: red;\n}
3	2	App.js	js	import React,{useState} from "react";\n                export default function App() {\n    const [highContrast, setHighContrast] = useState(false);\n\n    function toggleContrast() {\n        setHighContrast(!highContrast);\n    }\n\n    return (\n        <div className={highContrast ? "appContrast" : "app"}>\n            <h1 className={highContrast ? "contrastTitle" : "title"}>Color Contrast Challenge</h1>\n            <button\n                className={highContrast ? "high-contrast" : "toggle-contrast"}\n                onClick={toggleContrast}\n                aria-label="Toggle high contrast mode"\n            >Toggle High Contrast</button>\n        </div>\n    );\n}\n
4	2	styles.css	css	body {\n    font-family: Arial, sans-serif;\n}\n\n.app {\n    text-align: center;\n    padding: 50px;\n}\n\n.appContrast {\n    background-color: green;\n    padding: 50px;\n    text-align: center;\n}\n\n/* High Contrast Mode */\n.high-contrast {\n    background-color: black;\n    color: yellow;\n}\n\n.toggle-contrast {\n    margin-top: 20px;\n    background-color: blue;\n    color: white;\n    border: none;\n    padding: 10px 20px;\n    cursor: pointer;\n}\n\n.title {\n    color: black;\n}\n\n.contrastTitle {\n    color: white;\n}\n\n
5	3	App.js	js	import React,{useRef} from 'react'\nfunction App() {\n\n    const mainHeadingRef = useRef(null);\n\n    function handleSkipClick(event) {\n        event.preventDefault();\n        mainHeadingRef.current?.focus();\n    }\n\n    return (\n        <div>\n            <nav className="navbar">\n                <ul>\n                    <li><button onClick={handleSkipClick}>\n                        Skip to Content\n                    </button></li>\n                    <li><a href="#home">Home</a></li>\n                    <li><a href="#about">About</a></li>\n                    <li><a href="#contact">Contact</a></li>\n                </ul>\n            </nav>\n            <main>\n                <h1>Welcome to Our Site</h1>\n                <label htmlFor="main-input">Here is some content you can skip to.</label>\n                <input ref={mainHeadingRef} title="main-input" id="main-input" name="main-input"></input>\n            </main>\n        </div>\n    )\n}\n\nexport default App;
6	3	styles.css	css	body {\r\n  font-family: Arial, sans-serif;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.navbar {\r\n  background-color: #333;\r\n  padding: 10px;\r\n}\r\n\r\n.navbar ul {\r\n  list-style: none;\r\n  padding: 0;\r\n  display: flex;\r\n  gap: 20px;\r\n}\r\n\r\n.navbar a {\r\n  color: white;\r\n  text-decoration: none;\r\n}\r\n\r\nmain {\r\n  padding: 20px;\r\n}\r\n\r\nlabel {\r\n    display: block;\r\n    margin-bottom: 5px;\r\n}
7	4	App.js	js	export default function App() {\n    return (\n        <div>\n            <header role="banner" className="headerContent">\n                <h1>Website Title</h1>\n            </header>\n            <nav role="navigation" className="navigationContent">\n                <ul>\n                    <li><a href="#home">Home</a></li>\n                    <li><a href="#about">About</a></li>\n                    <li><a href="#contact">Contact</a></li>\n                </ul>\n            </nav>\n            <main role="main" className="mainContent">\n                <div>\n                    <h2>Welcome</h2>\n                    <p>This is the main content area.</p>\n                </div>\n            </main>\n            <footer role="contentinfo" className="footerContent">\n                <p>© 2024 Company Name</p>\n            </footer>\n        </div>\n    );\n}\n
8	4	styles.css	css	body, h1, h2, p, ul, li, a {\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: Arial, sans-serif;\r\n}\r\n\r\nbody {\r\n    background-color: #f4f4f4;\r\n    color: #333;\r\n    line-height: 1.6;\r\n    padding: 20px;\r\n}\r\n\r\n.headerContent, .navigationContent, .mainContent, .footerContent {\r\n    max-width: 800px;\r\n    margin: 0 auto;\r\n    padding: 20px;\r\n    background: white;\r\n    border-radius: 8px;\r\n    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.headerContent {\r\n    background: #0044cc;\r\n    color: white;\r\n    text-align: center;\r\n    padding: 20px;\r\n    font-size: 1.5rem;\r\n    font-weight: bold;\r\n}\r\n\r\n.navigationContent {\r\n    background: #eaeaea;\r\n    padding: 15px;\r\n    text-align: center;\r\n    margin-top: 10px;\r\n}\r\n\r\n.navigationContent ul {\r\n    list-style: none;\r\n}\r\n\r\n.navigationContent ul li {\r\n    display: inline;\r\n    margin: 0 15px;\r\n}\r\n\r\n.navigationContent ul li a {\r\n    text-decoration: none;\r\n    color: #0044cc;\r\n    font-weight: bold;\r\n}\r\n\r\n.navigationContent ul li a:hover,\r\n.navigationContent ul li a:focus {\r\n    text-decoration: underline;\r\n}\r\n\r\n.mainContent {\r\n    padding: 25px;\r\n    background: white;\r\n    margin-top: 10px;\r\n}\r\n\r\nh2 {\r\n    color: #0044cc;\r\n}\r\n\r\n.footerContent {\r\n    background: #222;\r\n    color: white;\r\n    text-align: center;\r\n    padding: 15px;\r\n    margin-top: 10px;\r\n}\r\n\r\na, button {\r\n    transition: outline 0.2s ease-in-out;\r\n}\r\n\r\na:focus, button:focus {\r\n    outline: 3px solid #ffcc00;\r\n    background: #fffbcc;\r\n}\r\n
9	5	App.js	js	import React, { useRef, useState, useEffect } from "react";\n\nconst DropDown = ({ items }) => {\n    const [isOpen, setIsOpen] = useState(false);\n    const menuRef = useRef(null);\n    const buttonRef = useRef(null);\n\n    useEffect(() => {\n        if (isOpen) {\n            const firstItem = menuRef.current?.querySelector("a");\n            firstItem?.focus();\n        }\n    }, [isOpen]);\n\n    const handleKeyDown = (event) => {\n        if (!isOpen) return;\n\n        const menuItems = menuRef.current ? Array.from(menuRef.current.querySelectorAll("a")) : [];\n        const currentIndex = menuItems.indexOf(document.activeElement);\n\n        switch (event.key) {\n            case "ArrowDown":\n                event.preventDefault();\n                const nextIndex = (currentIndex + 1) % menuItems.length;\n                menuItems[nextIndex]?.focus();\n                break;\n            case "ArrowUp":\n                event.preventDefault();\n                const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;\n                menuItems[prevIndex]?.focus();\n                break;\n            case "Escape":\n                setIsOpen(false);\n                buttonRef.current?.focus();\n                break;\n            default:\n                break;\n        }\n    };\n\n    return (\n        <>\n            <button\n                ref={buttonRef}\n                className="menu-button"\n                aria-haspopup="true"\n                aria-expanded={isOpen}\n                onClick={() => setIsOpen((prev) => !prev)}\n            >\n                ☰ Menu\n            </button>\n            {isOpen && (\n                <ul ref={menuRef} className="dropdown" onKeyDown={handleKeyDown} tabIndex={-1}>\n                    {items.map((item, index) => (\n                        <li role="menuitem" key={index}>\n                            <a aria-label={item} href={"#option" + index}>{item}</a>\n                        </li>\n                    ))}\n                </ul>\n            )}\n        </>\n    );\n};\n\nexport default function App() {\n    const items = ["Option 1", "Option 2", "Option 3"];\n\n    return (\n        <div className="container">\n            <nav role="navigation" className="navbar">\n                <DropDown items={items} />\n            </nav>\n        </div>\n    );\n}\n
10	5	styles.css	css	body {\r\n    font-family: Arial, sans-serif;\r\n    background-color: #f5f5f5;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n.container {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    height: 100vh;\r\n}\r\n\r\n.navbar {\r\n    position: relative;\r\n    background: white;\r\n    padding: 10px;\r\n    border-radius: 8px;\r\n    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.menu-button {\r\n    padding: 12px 20px;\r\n    font-size: 16px;\r\n    cursor: pointer;\r\n    background-color: #007bff;\r\n    color: white;\r\n    border: none;\r\n    border-radius: 5px;\r\n    transition: background 0.3s ease;\r\n}\r\n\r\n.menu-button:hover {\r\n    background-color: #0056b3;\r\n}\r\n\r\n.dropdown {\r\n    list-style: none;\r\n    padding: 0;\r\n    margin: 10px 0 0;\r\n    background: white;\r\n    border: 1px solid #ddd;\r\n    border-radius: 5px;\r\n    position: absolute;\r\n    width: 150px;\r\n    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.dropdown li {\r\n    padding: 10px;\r\n    transition: background 0.2s ease;\r\n}\r\n\r\n.dropdown li a {\r\n    text-decoration: none;\r\n    color: black;\r\n    display: block;\r\n}\r\n\r\n.dropdown li:hover {\r\n    background-color: #f0f0f0;\r\n}\r\n
11	6	App.js	js	import React, { useState, useEffect, useRef } from "react";\nimport "./styles.css";\n\nconst Toast = ({ message, type, onClose }) => {\n    const toastRef = useRef(null);\n\n    useEffect(() => {\n        const timer = setTimeout(onClose, 5000);\n        return () => clearTimeout(timer);\n    }, [onClose]);\n\n    return (\n        <div\n            ref={toastRef}\n            className={`toast ${type}`}\n            role="status"\n            aria-live={type === "error" ? "assertive" : "polite"}\n            data-testid={"toast-" + type}\n        >\n            <p>{message}</p>\n            <button onClick={onClose} aria-label="Close notification">✖</button>\n        </div>\n    );\n};\n\nconst App = () => {\n    const [toasts, setToasts] = useState([]);\n\n    const showToast = (message, type = "info") => {\n        setToasts([...toasts, { id: Date.now(), message, type }]);\n    };\n\n    return (\n        <div className="container">\n            <h1>Accessible Toast Notifications</h1>\n            <button onClick={() => showToast("Info message", "info")}>Show Info Toast</button>\n            <button onClick={() => showToast("Success message", "success")}>Show Success Toast</button>\n            <button onClick={() => showToast("Error message", "error")}>Show Error Toast</button>\n\n            <div className="toast-container">\n                {toasts.map((toast) => (\n                    <Toast\n                        key={toast.id}\n                        message={toast.message}\n                        type={toast.type}\n                        onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}\n                    />\n                ))}\n            </div>\n        </div>\n    );\n};\n\nexport default App;\n
12	6	styles.css	css	.container {\r\n    font-family: Arial, sans-serif;\r\n    text-align: center;\r\n    padding: 20px;\r\n}\r\n\r\nbutton {\r\n    margin: 10px;\r\n    padding: 10px 20px;\r\n    border: none;\r\n    cursor: pointer;\r\n    font-size: 16px;\r\n    border-radius: 5px;\r\n}\r\n\r\n.toast-container {\r\n    position: fixed;\r\n    bottom: 20px;\r\n    right: 20px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 10px;\r\n    margin-bottom: 50px;\r\n}\r\n\r\n.toast {\r\n    padding: 15px;\r\n    border-radius: 5px;\r\n    color: white;\r\n    font-size: 16px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    min-width: 250px;\r\n    max-width: 350px;\r\n    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);\r\n    outline: none;\r\n}\r\n\r\n.toast:focus {\r\n    outline: 2px solid #ffffff;\r\n}\r\n\r\n.info {\r\n    background-color: #007bff;\r\n}\r\n\r\n.success {\r\n    background-color: #28a745;\r\n}\r\n\r\n.error {\r\n    background-color: #dc3545;\r\n}\r\n\r\n.toast button {\r\n    background: none;\r\n    border: none;\r\n    color: white;\r\n    font-size: 16px;\r\n    cursor: pointer;\r\n    margin-left: 10px;\r\n}\r\n
13	7	App.js	js	export default function App() {\n    return (\n        <table data-testid="table" aria-describedby="table-description">\n            <caption id="table-description">\n                Shop Opening Times\n            </caption>\n            <thead>\n            <tr>\n                <td></td>\n                <th scope="col">Monday</th>\n                <th scope="col">Tuesday</th>\n                <th scope="col">Wednesday</th>\n                <th scope="col">Thursday</th>\n                <th scope="col">Friday</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr>\n                <th scope="row">09:00 – 11:00</th>\n                <td>Closed</td>\n                <td>Open</td>\n                <td>Open</td>\n                <td>Closed</td>\n                <td>Closed</td>\n            </tr>\n            <tr>\n                <th scope="row">11:00 – 13:00</th>\n                <td>Open</td>\n                <td>Open</td>\n                <td>Closed</td>\n                <td>Closed</td>\n                <td>Closed</td>\n            </tr>\n            <tr>\n                <th scope="row">13:00 – 16:00</th>\n                <td>Closed</td>\n                <td>Closed</td>\n                <td>Open</td>\n                <td>Open</td>\n                <td>Open</td>\n            </tr>\n            </tbody>\n        </table>\n    );\n};
14	7	styles.css	css	table {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n}\r\n\r\nth, td {\r\n    border: 1px solid #ccc;\r\n    padding: 8px;\r\n    text-align: left;\r\n}\r\n\r\nth {\r\n    background-color: #f4f4f4;\r\n}\r\n
15	8	App.js	js	import React from "react";\nimport "./styles.css";\n\nconst ImageGallery = () => {\n    const images = [\n        { src: "/public/react.svg", alt: "react logo image" },\n        { src: "/public/node.svg", alt: "node logo image" },\n        { src: "/public/next.svg", alt: "next logo image" },\n    ];\n\n    return (\n        <div className="gallery" role="list">\n            {images.map((image, index) => (\n                <img key={index} src={image.src} alt={image.alt} />\n            ))}\n        </div>\n    );\n};\n\nconst VideoPlayer = () => {\n    return (\n        <div className="video-container">\n            <video data-testid="video" controls aria-describedby="video-description">\n                <source data-testid="source" src="https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4" type="video/mp4" />\n                <track src="/public/captions.vtt" kind="captions" label="English captions" default />\n            </video>\n            <p id="video-description">This video is of a large rabbit yawning</p>\n            <div className="transcript">\n                <h2>Video Transcript</h2>\n                <p>[Narrator] A large rabbit climbs out of a hole. The rabbit does a big yawn. It then scratches his head.</p>\n            </div>\n        </div>\n    );\n};\n\nexport default function App() {\n    return (\n        <div className="container">\n            <h1>Media Gallery</h1>\n            <ImageGallery />\n            <VideoPlayer />\n        </div>\n    );\n}\n
16	8	styles.css	css	.container {\r\n    text-align: center;\r\n    font-family: Arial, sans-serif;\r\n}\r\n\r\n.gallery {\r\n    display: flex;\r\n    gap: 10px;\r\n    justify-content: center;\r\n    margin-top: 20px;\r\n}\r\n\r\n.gallery img {\r\n    width: 200px;\r\n    border: 2px solid #ddd;\r\n    cursor: pointer;\r\n}\r\n\r\n.video-container {\r\n    margin-top: 20px;\r\n}\r\n
17	9	App.js	js	export default function App() {\n    return (\n        <div>\n            <header className="header">\n                <h1>Welcome to the Site</h1>\n            </header>\n\n            <nav aria-label="Main Navigation">\n                <ul>\n                    <li><a href="#home">Home</a></li>\n                    <li><a href="#about">About</a></li>\n                    <li><a href="#contact">Contact</a></li>\n                </ul>\n            </nav>\n\n            <main className="main-content">\n                <h1>Main Heading</h1>\n                <p>Here is some important text.</p>\n                <img src="/public/cat.svg" alt="A cute rabbit yawning"/>\n\n                <button onClick={() => alert("Clicked!")}>Click Me</button>\n\n\n                <form>\n                    <label htmlFor="name">Name:</label>\n                    <input type="text" id="name" name="name"/>\n\n                    <label htmlFor="email">Email:</label>\n                    <input type="email" id="email" name="email"/>\n\n                    <button type="submit">Submit</button>\n                </form>\n            </main>\n            <footer className="footer">\n                <p>© 2025 My Website</p>\n            </footer>\n        </div>\n    );\n}
18	9	styles.css	css	body {\n    font-family: Arial, sans-serif;\n    font-size: 16px;\n    color: #222;\n}\n\n.header {\n    background-color: #0055aa;\n    color: white;\n    padding: 10px;\n    text-align: center;\n}\n\nnav ul {\n    list-style: none;\n    padding: 0;\n    display: flex;\n    gap: 10px;\n}\n\nnav a {\n    text-decoration: none;\n    color: #0055aa;\n    font-weight: bold;\n}\n\n.main-content {\n    padding: 20px;\n}\n\nimg {\n  width: 30px;\n}\n\nbutton {\n    background-color: #0055aa;\n    color: white;\n    padding: 10px;\n    border: none;\n    cursor: pointer;\n}\n\n.footer {\n    text-align: center;\n    padding: 10px;\n    background-color: #222;\n    color: white;\n}
19	10	App.js	js	import {useRef, useEffect} from 'react';\n\nexport default function App() {\n\n    const chartRef = useRef(null);\n\n    useEffect(() => {\n        const canvas = chartRef.current;\n        const ctx = canvas?.getContext("2d");\n\n        ctx.fillStyle = "#f0f0f0";\n        ctx.fillRect(0, 0, canvas.width, canvas.height);\n\n        ctx.fillStyle = "red";\n        ctx.fillRect(50, 50, 100, 100);\n\n        ctx.fillStyle = "blue";\n        ctx.beginPath();\n        ctx.arc(200, 100, 50, 0, Math.PI * 2);\n        ctx.fill();\n\n        ctx.strokeStyle = "green";\n        ctx.lineWidth = 4;\n        ctx.beginPath();\n        ctx.moveTo(50, 200);\n        ctx.lineTo(250, 200);\n        ctx.stroke();\n    }, []);\n\n    return (\n        <div className="dashboard">\n            <header>\n                <h1>Dashboard</h1>\n                <button aria-label="Open Settings">\n                    <img src="/public/settings.svg" alt="Settings" />\n                </button>\n            </header>\n\n            <nav role="navigation">\n                <ul>\n                    <li><a href="#analytics">View Analytics</a></li>\n                    <li><a href="#reports">Download Reports</a></li>\n                </ul>\n            </nav>\n\n            <main id="main-content">\n                <h2>Statistics</h2>\n                <p>This is a dashboard about the stats!</p>\n                <canvas data-testid="canvas" ref={chartRef} id="chart" aria-label="Sales data over the past year"></canvas>\n                <button aria-label="Refresh Data">🔄</button>\n            </main>\n\n            <aside>\n                <h2>Notifications</h2>\n                <ul>\n                    <li><span role="alert" aria-label="Warning">⚠</span>Alert: System Update Required</li>\n                    <li><span role="status" aria-label="Information">ℹ</span>Info: New Report Available</li>\n                </ul>\n            </aside>\n\n            <footer role="contentinfo">\n                <p>© 2025 Dashboard</p>\n            </footer>\n        </div>\n    );\n}\n
20	10	styles.css	css	body {\n    font-family: Arial, sans-serif;\n}\n\nbutton {\n    background: #007BFF;\n    color: white;\n    border: none;\n    padding: 10px;\n    cursor: pointer;\n}\n\np {\n    color: black;\n}\n\ncanvas {\n    width: 300px;\n    height: 150px;\n    border: 1px solid #ccc;\n}\n\n.skip-link {\n    position: absolute;\n    top: -40px;\n    left: 10px;\n    background: #000;\n    color: white;\n    padding: 5px;\n}\n\n.skip-link:focus {\n    top: 10px;\n}\n\nimg {\n    width: 20px;\n}\n
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.posts (id, userid, levelid, datetime, title, message) FROM stdin;
1	29	6	2025-02-24 21:56:49.995609	test	test
2	29	9	2025-02-27 18:52:43.606895	This is my solution to the contrast problem, what do you guys think?	I had a lot of fun doing this level and I would really like some feed back on:\n-The styling\n-The button functionality\n-My coding style\n-Formatting\nThank you very much!
3	29	10	2025-02-28 20:52:54.617424	Solution	Do you like it?
4	29	11	2025-03-02 17:28:58.313311	This is my solution	What do you think?
5	29	12	2025-03-04 00:48:19.400257	This is my solution!	What do you guys think?
6	29	13	2025-03-05 22:58:07.964317	This is my solution	what do you think?
7	29	14	2025-03-06 01:10:22.837607	This is my solution	What do you think?
8	29	15	2025-03-06 16:24:33.330319	This is my solution	What do you think?
9	29	16	2025-03-06 23:36:08.502957	This is my solution	What do you think?
10	29	17	2025-03-07 15:40:04.5527	This is my solution	What do you think?
\.


--
-- Data for Name: saved_files; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.saved_files (id, userid, levelid, name, filetype, content, datetime) FROM stdin;
\.


--
-- Data for Name: user_levels; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_levels (id, userid, levelid, datetime) FROM stdin;
3	29	6	2025-02-19 22:35:41.384419
4	29	7	2025-02-21 13:15:03.4956
5	29	8	2025-02-21 14:29:23.263934
6	29	6	2025-02-21 14:37:36.090942
7	29	6	2025-02-21 16:32:44.182627
8	29	6	2025-02-24 21:37:48.479935
9	29	6	2025-02-24 21:42:34.929029
10	29	6	2025-02-24 21:49:23.989787
11	29	6	2025-02-27 01:36:51.749026
12	29	6	2025-02-27 01:39:17.950814
13	29	9	2025-02-27 18:51:17.93545
14	29	10	2025-02-28 20:52:36.390812
15	29	11	2025-03-02 17:28:35.413557
16	29	12	2025-03-04 00:47:05.834293
17	29	13	2025-03-05 22:57:41.780746
18	29	13	2025-03-05 23:02:53.0307
19	29	14	2025-03-06 01:10:05.036337
20	29	15	2025-03-06 16:24:13.662665
21	29	16	2025-03-06 23:35:50.556483
22	29	17	2025-03-07 15:39:47.166595
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, username, password) FROM stdin;
24	tw	$2b$10$mEY/gHCk/iouzmnOGU3DWesrlLcKhBYfQZJBwONrafPOHd3VHRjdy
25	abc	$2b$10$ha3cFetVXejt7uLU7.o9TO.ztrSoW0YYaeIQjv807OS7JGtkXoL0W
26	abcd	$2b$10$7.KvCqFleiYWfISPmVtCcu7yJl2csdtKLfvzgDObukER4xR34ArqC
27	mn	$2b$10$NIAJu0nrba1O1AW6/TzSiuNf9/flgxkpo09r/oEmSyMsKpFZR3iHG
28	test1	$2b$10$f0OzFB5JiymI31BGZAQzb.FRm6eo5twgzy9h09HAbwKVdWkUGNKp6
29	tward02	$2b$10$3znIu1wCdHG.z1lNAJkohuO1US/UEOPUz.ONwvulCnoklIjKdx8k6
30	tward03	$2b$10$utTAuRoQc44z9H8RwPnEDOE6Tto0EsH2ulQPwSmVtRoWLC0YxkxmC
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.comments_id_seq', 10, true);


--
-- Name: level_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.level_files_id_seq', 37, true);


--
-- Name: level_hints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.level_hints_id_seq', 1, false);


--
-- Name: level_tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.level_tests_id_seq', 27, true);


--
-- Name: levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.levels_id_seq', 17, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.likes_id_seq', 19, true);


--
-- Name: post_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.post_files_id_seq', 20, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.posts_id_seq', 10, true);


--
-- Name: saved_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.saved_files_id_seq', 10, true);


--
-- Name: user_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_levels_id_seq', 22, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 30, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: level_files level_files_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_files
    ADD CONSTRAINT level_files_pkey PRIMARY KEY (id);


--
-- Name: level_hints level_hints_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_hints
    ADD CONSTRAINT level_hints_pkey PRIMARY KEY (id);


--
-- Name: level_tests level_tests_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_tests
    ADD CONSTRAINT level_tests_pkey PRIMARY KEY (id);


--
-- Name: levels levels_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.levels
    ADD CONSTRAINT levels_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: post_files post_files_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.post_files
    ADD CONSTRAINT post_files_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: saved_files saved_files_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.saved_files
    ADD CONSTRAINT saved_files_pkey PRIMARY KEY (id);


--
-- Name: saved_files unique_user_level_name; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.saved_files
    ADD CONSTRAINT unique_user_level_name UNIQUE (userid, levelid, name);


--
-- Name: user_levels user_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_levels
    ADD CONSTRAINT user_levels_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments comments_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_postid_fkey FOREIGN KEY (postid) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: comments comments_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: level_files level_files_levelid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_files
    ADD CONSTRAINT level_files_levelid_fkey FOREIGN KEY (levelid) REFERENCES public.levels(id) ON DELETE CASCADE;


--
-- Name: level_hints level_hints_levelid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_hints
    ADD CONSTRAINT level_hints_levelid_fkey FOREIGN KEY (levelid) REFERENCES public.levels(id) ON DELETE CASCADE;


--
-- Name: level_tests level_tests_levelid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_tests
    ADD CONSTRAINT level_tests_levelid_fkey FOREIGN KEY (levelid) REFERENCES public.levels(id) ON DELETE CASCADE;


--
-- Name: likes likes_commentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_commentid_fkey FOREIGN KEY (commentid) REFERENCES public.comments(id) ON DELETE CASCADE;


--
-- Name: likes likes_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_postid_fkey FOREIGN KEY (postid) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: likes likes_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: post_files post_files_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.post_files
    ADD CONSTRAINT post_files_postid_fkey FOREIGN KEY (postid) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: posts posts_levelid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_levelid_fkey FOREIGN KEY (levelid) REFERENCES public.levels(id) ON DELETE CASCADE;


--
-- Name: posts posts_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: saved_files saved_files_levelid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.saved_files
    ADD CONSTRAINT saved_files_levelid_fkey FOREIGN KEY (levelid) REFERENCES public.levels(id) ON DELETE CASCADE;


--
-- Name: saved_files saved_files_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.saved_files
    ADD CONSTRAINT saved_files_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_levels user_levels_levelid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_levels
    ADD CONSTRAINT user_levels_levelid_fkey FOREIGN KEY (levelid) REFERENCES public.levels(id) ON DELETE CASCADE;


--
-- Name: user_levels user_levels_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_levels
    ADD CONSTRAINT user_levels_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

