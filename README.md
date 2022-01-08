# Этап сборки

1. Установить зависимости

```bash
npm install
```

2. Сборка в dev режиме с вотчером

```bash
npm run dev
```

3. Билд статики

```bash
npm run build
```

после билда в папке dist создадутся готовые файлы для клиента со следующей структурой:

```
--dist
----index.html
----vendors.js
----main.js
----assets
------image|svg|old files
```
