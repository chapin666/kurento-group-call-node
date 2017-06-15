
# kurento-group-call-node (DEFAULT SFU)

### Required

Node Version: Node 8.x

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

npm install bower -g

npm run get
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


### Mobile Client ( React Native )

[kurento-group-call-react-native](https://github.com/chapin666/kurento-group-call-react-native)

server-side Must be trusted https

or

modify the server-side code to http (Only Firefox support)
