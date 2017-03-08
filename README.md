# kurento-group-call-node (DEFAULT SFU)

### branch checkout
```
git checkout sfu
```
or
```
git checkout mcu
```

### install
```
npm install yarn

yarn install

cd server/static/

bower install
```

### edit
```
./server/index.js 

const argv = minimst(process.argv.slice(2), {
    default: {
        as_uri: 'https://localhost:3000',
        ws_uri: 'ws://127.0.0.1:8888/kurento'   // your KMS uri
    }
});

```

### run
```
 node index.js 

```