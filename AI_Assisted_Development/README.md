# Session 1 Overview: Kickoff & AI-Assisted Interactive Development Environment Setup

In this session, you'll set up your development environment and get introduced to AI-assisted coding with Cursor, Git workflows, and LLM APIs.

## **📛 Required Tooling & Account Setup**

1. 🧑‍💻 Set up **Cursor** as your AI-Assisted Interactive Development Environment (AI-IDE). Download from [cursor.com](https://cursor.com).
2. 🔑 Set up an **API key** for [OpenAI](https://platform.openai.com/docs/models). Start [here](https://platform.openai.com/docs/quickstart/step-2-set-up-your-api-key) to create an OpenAI key you can use throughout the session.
   - **Security Best Practice**: When storing API keys, create a `.env` file in your project root. Add `.env` to `.gitignore` to prevent accidentally committing secrets to version control.

## **🧑‍💻 Recommended Pre-Work**

1. 🔀 Review the prerequisite Git & LLM material in this folder.
2. 📚 Read the following relevant papers and blogs on **AI-Assisted Development**:
    - [Cursor Release Blog 2.0](https://cursor.com/blog/2-0) (Oct 2025)
    - [Claude Code: Best Practices for Agentic Coding](https://www.anthropic.com/engineering/claude-code-best-practices) (Apr 2025)
    - [Not All AI-Assisted Programming Is Vibe-Coding](https://simonwillison.net/2025/Mar/19/vibe-coding/) — by Simon Willison (Mar 2025)
3. 📚 Read the following relevant papers on **Prompting LLMs**:
    - [Principled Instructions Are All You Need for Questioning LLaMA-1/2, GPT-3.5/4](https://arxiv.org/abs/2312.16171) (Dec 2023)
    - [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903) (Jan 2022)
    - [Language Models Are Few-Shot Learners](https://arxiv.org/abs/2005.14165) (May 2020)

## **🤔 Concepts**

The core **concepts** we'll cover in Session 1 fall under two themes:

### **Software Engineering Using Branch Development**

1. Basic [Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
2. Remote vs. Local Git Repositories — [Working with Remotes](https://git-scm.com/book/ms/v2/Git-Basics-Working-with-Remotes)
3. [Cursor Rules](https://cursor.com/docs/context/rules)

### **Large Language Model Application Programming Interfaces (LLM APIs)**

1. The [Chat Completions](https://platform.openai.com/docs/api-reference/chat) model

---

## **⌨️ Code**

The **code** for this session flows directly from these core concepts, and includes:

1. Detailed Git Flow
2. AI-Assisted Branch Development Using Cursor Rules
3. Sending requests and getting responses using LLM APIs

## 🤩 **For Fun**

- Original [vibe coding tweet](https://x.com/karpathy/status/1886192184808149383) by Andrej Karpathy
- The [Way of Code](https://www.thewayofcode.com/) by Rick Rubin and an [interview on its cultural impact](https://www.youtube.com/watch?v=6BDsFUvPqI0)
