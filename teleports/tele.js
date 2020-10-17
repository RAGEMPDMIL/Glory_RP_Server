const teleport = {
    "bank":{
      "x":-1579.756,
      "y":-565.0661,
      "z":108.523,
      "ipl":"ex_sm_13_office_02b"
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
      }
};

mp.events.addCommand("tp", (player, fullText,location) => {
    console.log(fullText);
    if(teleport[location])
    {
        player.outputChatBox(`!{#3399ff}${location} השתגרת בהצלחה ל`);
        player.position = new mp.Vector3(teleport[location].x,teleport[location].y,teleport[location].z);
        player.call('loadInterior',[teleport[location].x,teleport[location].y,teleport[location].z,teleport[location].ipl]);
    }
    else{
        player.outputChatBox(`!{#ff0000}There is no location ${location} in the list`);
    }
  });