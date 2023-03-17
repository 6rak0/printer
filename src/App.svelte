<script>
  import qrcode from "qrcode";
  import { addPackage } from "./lib/db";
  import { printImage } from "./lib/utils";

  let client;
  let data;
  let img;

  const getCode = async () => {
    try {
      const pack = await addPackage({client, data});
      const wawa = {
        id: pack.id,
        client: pack.client,
        data: pack.data,
      };
      await qrcode.toDataURL(JSON.stringify(wawa), function (err, url) {
        if(err) throw new Error('qr code creation failed')
        img = url;
      });
    } catch (error) {
      console.log(error.message)
    }
  };
</script>

<input type="text" placeholder="client" bind:value={client} />
<input type="text" placeholder="data" bind:value={data} />
<!-- <button on:click={addPackage}>add package</button> -->
<button on:click={getCode}>crear código</button>

{#if img}
  <img src={img} alt="test" style="height: 300px; width:300px" />
  <button on:click={()=> printImage(img)}>print</button>
{/if}
