Вот компактная версия `README.md` для GitHub:

````markdown
# SetSerializer

Compact serialization for sets of integers from 1 to 300.  
Packs numbers into a **bitmask** and encodes as Base64 for minimal string size.

## Features

- Works with numbers **1–300**, sets of 5–1000 elements  
- Removes duplicates automatically  
- ASCII output  
- Typically **2x smaller** than comma-separated strings  

## Usage

```html
<script src="index.js"></script>
<script>
const numbers = [1,5,100,237,300];
const packed = SetSerializer.serialize(numbers);
console.log(packed);

const decoded = SetSerializer.deserialize(packed);
console.log(decoded); // [1,5,100,237,300]
</script>
````

## API

* `SetSerializer.serialize(arr: number[]): string` – compress set to Base64
* `SetSerializer.deserialize(str: string): number[]` – restore original numbers

## License

MIT

```
```
