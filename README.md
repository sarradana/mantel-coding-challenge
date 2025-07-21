# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Mantel question:
# Assumption
- The code is a simple log analyzer that reads logs from a file, parses them, and analyzes them using different analyzers.
- the logs follow the given format. I can see some logs include some `junk extra` and some are tagged with admin so I am assuming that the logs are not always clean. but I have all the varieties present in the given logs.
	
- 
- 
- •	Uses composition (pluggable analyzers)
	•	Follows single responsibility principle (reader, parser, analyzers, engine)
	•	Easy to extend with more analyzers (e.g., ErrorFrequencyAnalyzer)
	•	Can later swap out input (e.g., from file, network, etc.)
