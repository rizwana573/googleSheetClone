let downloadBtn = document.getElementById("download");
let uploadBtn = document.getElementById("upload");

downloadBtn.addEventListener("click", (e) => {
    let jsonData = JSON.stringify([sheetDB, graphComponentMatrix]);
    let file = new Blob([jsonData], {type: "application/json"});
    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
})

uploadBtn.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let fr = new FileReader();
        let files = input.files;
        let fileObject = files[0];

        fr.readAsText(fileObject);
        fr.addEventListener("load", (e) => {
            let sheetData = JSON.parse(fr.result);
            console.log("sheet data " ,sheetData);
            addSheet.click();
            let num = 
            cellProps();
        })
    })
})