const teleport = {
    "bank":{
      "x":232.7639,
      "y":215.9510,
      "z":106.2866,
      "ipl":""
    },
    "bank2":{
        "x":-75.8466,
        "y":-826.9893,
        "z":243.3859,
        "ipl":"ex_dt1_11_office_02b"
      },
      "bank3":{
        "x":2.6968,
        "y":-667.0166,
        "z":16.13061,
        "ipl":"FINBANK"
      },
    "casino":{
        "x":1100.000,
        "y":220.000,
        "z":-50.000,
        "ipl":"vw_casino_main"
      },
      "gunstore":{
        "x": 246.593017578125,
        "y": -46.60612869262695,
        "z": 69.9410629272461
      }
      
};

mp.events.addCommand("tp", (player, fullText,location) => {
    console.log(fullText);
    if(teleport[location])
    {
        player.outputChatBox(`!{#3399ff}${location} השתגרת בהצלחה ל`);
        player.position = new mp.Vector3(teleport[location].x,teleport[location].y,teleport[location].z);
        if(teleport[location].ipl) player.call('client:player:loadInterior',[teleport[location].x,teleport[location].y,teleport[location].z,teleport[location].ipl]);
    }
    else{
        player.outputChatBox(`!{#ff0000}There is no location ${location} in the list`);
    }
  });