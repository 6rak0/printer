<script>
  import qrcode from "qrcode";
  import PocketBase from "pocketbase";

  let client;
  let data;
  let img;

  const pb = new PocketBase(import.meta.env.VITE_DB_URL);

  const addPackage = async () => {
    const payload = {
      client,
      data,
    };
    const record = await pb.collection("packages").create(payload);
    //console.log(record.id)
    return record;
  };

  const getImage = async () => {
    const pack = await addPackage();
    console.log(pack);
    const wawa = {
      id: pack.id,
      client: pack.client,
      data: pack.data,
    };
    await qrcode.toDataURL(JSON.stringify(wawa), function (err, url) {
      img = url;
    });
  };

  function printImage() {
    var printWindow = window.open("", "_blank", "height=400,width=600");
    printWindow.document.write(
      '<html><head><title>imprimir qr</title></head><body><img src="' +
        img +
        '"></body></html>'
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
</script>

<input type="text" placeholder="client" bind:value={client} />
<input type="text" placeholder="data" bind:value={data} />
<button on:click={addPackage}>add package</button>
<button on:click={getImage}>get image</button>
<button on:click={printImage}>print</button>

<img src={img} alt="test" style="height: 300px; width:300px" />
