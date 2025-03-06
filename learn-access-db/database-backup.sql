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
6	7	App functionality Test Suite	playwright	import { test, expect } from "@playwright/test";\r\nimport React from "react";\r\n\r\ntest("User can open and close modal with Tab and Enter correctly", async ({ page }) => {\r\n\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const openButton = page.getByText("Open Modal");\r\n    await page.keyboard.press("Tab");\r\n    await expect(openButton).toBeFocused();\r\n    await page.keyboard.press("Enter");\r\n\r\n    const modal = page.locator('[role="dialog"]');\r\n    await expect(modal).toBeVisible();\r\n\r\n    await page.keyboard.press("Enter");\r\n\r\n    await expect(modal).not.toBeVisible();\r\n\r\n    await expect(openButton).toBeFocused();\r\n});\r\n\r\ntest("User can open and close modal with Tab and Enter and Escape correctly", async ({ page }) => {\r\n\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const openButton = page.getByText("Open Modal");\r\n    await page.keyboard.press("Tab");\r\n    await expect(openButton).toBeFocused();\r\n    await page.keyboard.press("Enter");\r\n\r\n    const modal = page.locator('[role="dialog"]');\r\n    await expect(modal).toBeVisible();\r\n\r\n    await page.keyboard.press("Escape");\r\n\r\n    await expect(modal).not.toBeVisible();\r\n\r\n    await expect(openButton).toBeFocused();\r\n});\r\n
7	6	App CSS Test Suite	playwright	import { test, expect } from '@playwright/test';\r\nimport React from "react";\r\n\r\ntest('Expect h1 element to be blue rgb(0, 0, 255)', async ({ page }) => {\r\n\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    await page.waitForSelector('h1');\r\n\r\n    const element = await page.locator('h1');\r\n    await expect(element).toHaveCSS('color', 'rgb(0, 0, 255)');\r\n    const classCount = await element.evaluate(el => el.classList.length);\r\n    expect(classCount).toBeLessThanOrEqual(1);\r\n    const color = await element.evaluate(el => getComputedStyle(el).color);\r\n\r\n    expect(color).toBe('rgb(0, 0, 255)');\r\n});
9	8	App Functionality Tests	jest	import React from "react";\r\nimport {fireEvent, render, screen} from "@testing-library/react";\r\nimport '@testing-library/jest-dom';\r\nimport App from "./App";\r\n\r\nit("Form renders correctly with all required components", () => {\r\n    const result = render(<App/>);\r\n    expect(screen.getByText("Accessible Login Form")).toBeInTheDocument();\r\n    expect(screen.getByText("Email:")).toBeInTheDocument();\r\n    expect(screen.getByText("Password:")).toBeInTheDocument();\r\n    expect(screen.getByText("Login")).toBeInTheDocument();\r\n    expect(result.container.querySelector('#email')).toBeInTheDocument();\r\n    expect(result.container.querySelector('#password')).toBeInTheDocument();\r\n    expect(screen.queryByRole("alert")).not.toBeInTheDocument();\r\n})\r\n\r\nit("Renders the login form with labels correctly associated with inputs", () => {\r\n    const result = render(<App/>);\r\n    const emailLabel = screen.getByText("Email:");\r\n    const passwordLabel = screen.getByText("Password:");\r\n\r\n    expect(emailLabel).toHaveAttribute("for", "email");\r\n    expect(passwordLabel).toHaveAttribute("for", "password");\r\n\r\n    expect(screen.getByLabelText("Email:")).toEqual(result.container.querySelector('#email'))\r\n    expect(screen.getByLabelText("Password:")).toEqual(result.container.querySelector('#password'))\r\n\r\n    const emailInput = screen.getByRole("textbox", {name: /email/i});\r\n    const passwordInput = screen.getByLabelText("Password:");\r\n    expect(emailInput).toBeInTheDocument();\r\n    expect(passwordInput).toBeInTheDocument();\r\n});\r\n\r\nit("Form validates email correctly with expected error message", async () => {\r\n    const result = render(<App/>);\r\n    const emailInput = result.container.querySelector('#email')\r\n    const passwordInput = result.container.querySelector('#password')\r\n    const submitButton = screen.getByRole("button", {name: /login/i});\r\n\r\n    fireEvent.change(emailInput, {target: {value: "invalidEmail"}})\r\n    fireEvent.change(passwordInput, {target: {value: "password"}});\r\n    submitButton.click();\r\n\r\n    const error = await screen.findByRole("alert");\r\n    expect(error).toHaveTextContent("Invalid Email");\r\n});\r\n\r\nit("Form validates password correctly with expected error message", () => {\r\n    const result = render(<App/>);\r\n    const emailInput = result.container.querySelector('#email')\r\n    const passwordInput = result.container.querySelector('#password')\r\n    const submitButton = screen.getByRole("button", {name: /login/i});\r\n\r\n    fireEvent.change(emailInput, {target: {value: "test@example.com"}});\r\n    fireEvent.click(submitButton);\r\n\r\n    const error = screen.getByRole("alert");\r\n    expect(error).toHaveTextContent("Invalid Password");\r\n});\r\n\r\nit("Shows no errors when input is valid", () => {\r\n    const result = render(<App/>);\r\n    const emailInput = result.container.querySelector('#email')\r\n    const passwordInput = result.container.querySelector('#password')\r\n    const submitButton = screen.getByRole("button", {name: /login/i});\r\n\r\n    fireEvent.change(emailInput, {target: {value: "test@example.com"}});\r\n    fireEvent.change(passwordInput, {target: {value: "password"}});\r\n    fireEvent.click(submitButton);\r\n\r\n    expect(screen.queryByRole("alert")).not.toBeInTheDocument();\r\n});\r\n
10	9	App Structure Test Suite	jest	import { render, screen } from "@testing-library/react";\r\nimport '@testing-library/jest-dom';\r\nimport App from "./App";\r\nimport React from "react";\r\n\r\ntest("UI should have all required elements", async () => {\r\n    render(<App />);\r\n    expect(screen.getByText("Toggle High Contrast")).toBeInTheDocument();\r\n    expect(screen.getByText("Color Contrast Challenge")).toBeInTheDocument();\r\n});\r\n
11	9	App Styles and Contrast Test Suite	playwright	import { test, expect } from "@playwright/test";\r\nimport React, {useState} from "react";\r\nimport AxeBuilder from '@axe-core/playwright';\r\n\r\ntest("Initial UI should have no colour contrast issues", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();\r\n    const filtered = accessibilityScanResults.violations.filter((item) => item.id === "color-contrast")\r\n\r\n    expect(filtered).toEqual([]);\r\n});\r\n\r\ntest("Button should toggle high contrast mode, which should be different from the original UI", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    const button = page.getByText("Toggle High Contrast");\r\n    const title = await page.getByText("Color Contrast Challenge");\r\n\r\n    const titleColour = await title.evaluate(el => getComputedStyle(el).color);\r\n    const buttonBackground = await button.evaluate(el => getComputedStyle(el).backgroundColor);\r\n    const buttonColour = await button.evaluate(el => getComputedStyle(el).color);\r\n\r\n    await button.click();\r\n\r\n    const newTitleColour = await title.evaluate(el => getComputedStyle(el).color);\r\n    const newButtonBackground = await button.evaluate(el => getComputedStyle(el).backgroundColor);\r\n    const newButtonColour = await button.evaluate(el => getComputedStyle(el).color);\r\n\r\n    expect(titleColour).not.toEqual(newTitleColour);\r\n    expect(buttonBackground).not.toEqual(newButtonBackground);\r\n    expect(buttonColour).not.toEqual(newButtonColour);\r\n});\r\n\r\ntest("High contrast mode should also meet the accessibility requirements", async ({ page }) => {\r\n    await page.setContent(`\r\n        ///Render///\r\n    `);\r\n\r\n    await page.getByText("Toggle High Contrast").click();\r\n\r\n    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();\r\n    const filtered = accessibilityScanResults.violations.filter((item) => item.id === "color-contrast")\r\n\r\n    expect(filtered).toEqual([]);\r\n});
\.


--
-- Data for Name: levels; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.levels (id, name, description, objectives, expiration, previouslevelid, enhanceddescription) FROM stdin;
6	Tutorial	Introduction to the application and the basics.	1. Change the h1 element to display "I love WCAG!" \\n\\n2. Change the colour of the h1 element to be blue rgb(0, 0, 255) \\n\\n3. No other elements should be displayed	\N	\N	This is a tutorial on the basics of using the application and completing levels. \\n\\nThe Description tells you about the content of the level, the WCAG challenges being tackled and any background knowledge needed. \\n\\nThe Objectives section lays out what you must do in order to complete the level and advance to the next. \\n\\nThe code editor will render anything coded in react into the window to the right, any console outputs being displayed below that. \\n\\nHints can be viewed and using the Hint button, a maximum of three hints are allowed per level. The reset button will reset the code in the editor to the default value and cannot be undone. The Test button will run the test suites on your solution in order to check if it has passed, all results will be displayed in the test console and finally the Submit button will submit your solution.
7	Keeping Focus	This level explores the importance of focus and keyboard navigation in user interfaces	1. Ensure that when the Modal is opened focus switches onto the button on the Modal\r\n\r\n2. When the Modal is closed ensure focus is switched back to the open button\r\n\r\n3. The user should also be able to use the keyboard to carry out operations, the Escape key should close the modal, pressing Enter or Space should activate the buttons and pressing Tab should allow the user to navigate between focusable elements	\N	6	Focus Order (WCAG Reference 2.4.3) and Keyboard Navigation (WCAG Reference 2.1.1) are both very important parts of WCAG. When they are implemented badly or not at all people who are unable to use a mouse can find it very difficult or even impossible to navigate web pages.\r\n\r\nIt is important that when users carry out certain actions the focus remains/is moved to a place on the page that is relevant to the action and makes sense to the user.\r\n\r\nGoals:\r\n\r\n1. Everything can be done with a keyboard except freehand movements. Esnure pointer actions have a keyboard equivalent, as many people rely on the keyboard interface, including blind and some mobility impaired people.\r\n\r\n2. Keyboard users navigate content in a correct order. Elements receive focus in an order that preserves meaning so that navigating a website with only a keyboard make sense. \\links\\https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html,https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html
8	What's the Password?	Explores how to create accessible forms and handle validation	1. Ensure the form is accessible associating any labels and field using the htmlFor attribute\r\n\r\n2. Implement validation on the form with the following rules: email addresses must be valid and passwords must not be empty\r\n\r\n3. On submission, any errors must be displayed in an accessible way using the alert role, for this level please display "Invalid Password", "Invalid Email" respectively	\N	7	Forms make up a significant part of the Web, so ensuring they are accessible is extremely important.\r\n\r\nWe not only need to make them easy to navigate and fill in for users with accessibility needs, but also need to account for errors.\r\n\r\nThe htmlFor attribute is used to associate labels with form fields, e.g. htmlFor="fieldId", this is extremely useful for users who require screen readers or other accessibility software.\r\n\r\nRoles are used to specify what different elements are used for, in this case for form validation errors role="alert" ensures that accessibility software picks up the fact that this is important for the form validation.\r\n\r\nGoals: \\n\\n1. Users should know what information to enter. We need to provide labels and instructions for inputs, so that everyone will know hoe to respond. \\n\\n2. People using assistive technology understand all components. We need to ensure we give all components the correct names, roles, states and values as assistive technologies only work when it is coded properly
9	Contrasting Views	This level is about the importance of styling, colours and contrast on user interfaces.	1. Ensure that the initial UI has a high enough contrast between all elements (4.5:1).\r\n\r\n2. When the button is clicked the styling should toggle, offering a different contrast on the page.\r\n\r\n3. When the button is clicked again it should switch back to the original.	\N	8	Styling, colours and contrast play a big role in making UIs accessible.\r\n\r\nWCAG 2.2 states that the minimum contrast between two different text and other elements should be 4.5:1 with larger scale text should have a minimum contrast of 3:1.\r\n\r\nThe goal of this is so that text can be seen by more people, as people with visual impairments can struggle to read certain colours or text with too low contrasts.\\links\\https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
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
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.posts (id, userid, levelid, datetime, title, message) FROM stdin;
1	29	6	2025-02-24 21:56:49.995609	test	test
2	29	9	2025-02-27 18:52:43.606895	This is my solution to the contrast problem, what do you guys think?	I had a lot of fun doing this level and I would really like some feed back on:\n-The styling\n-The button functionality\n-My coding style\n-Formatting\nThank you very much!
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
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.comments_id_seq', 10, true);


--
-- Name: level_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.level_files_id_seq', 13, true);


--
-- Name: level_hints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.level_hints_id_seq', 1, false);


--
-- Name: level_tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.level_tests_id_seq', 11, true);


--
-- Name: levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.levels_id_seq', 9, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.likes_id_seq', 19, true);


--
-- Name: post_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.post_files_id_seq', 4, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.posts_id_seq', 2, true);


--
-- Name: saved_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.saved_files_id_seq', 10, true);


--
-- Name: user_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_levels_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 29, true);


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

