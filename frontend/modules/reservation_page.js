import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let data;
  try{
  let apiData = await fetch(config.backendEndpoint + "/reservations/");
  data = await apiData.json();
  }
  catch(err){
    return null;
  }
  return data;
}

function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //console.log("Inside addReservationTable", reservations);
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length){
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block"
  }
  else{
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  let table = document.getElementById("reservation-table");
  for(var x of reservations) {
     
    const date = new Date(x.date);
    const time = new Date(x.time).toLocaleDateString("en-IN",{
      day:"numeric",
      month:"long",
      year:"numeric",
      hour12:true,
      hour:"numeric",
      minute:"numeric",
      second:"numeric"
    }).replace(" at ",", ");

    let trow = document.createElement("tr");
    trow.innerHTML = `
     <td>${x.id}</td>
     <td>${x.name}</td>
     <td>${x.adventureName}</td>
     <td>${parseInt(x.person)}</td>
     <td>${date.toLocaleDateString("en-IN")}</td>
     <td>${x.price}</td>
     <td>${time}</td>
    `;
    let button = document.createElement("button");
    button.innerHTML = "Visit Adventure";
    button.setAttribute("id",x.id);
    button.setAttribute("class" , "reservation-visit-button")
    let td = document.createElement("td");
    let anchorTag = document.createElement("a");
    anchorTag.href = `${config.backendEndpointTemp}:8081/frontend/pages/adventures/detail/?adventure=${x.adventure}`;
    button.appendChild(anchorTag);
    let OuterAnchorTag = document.createElement("a");
    OuterAnchorTag.href = `${config.backendEndpointTemp}:8081/frontend/pages/adventures/detail/?adventure=${x.adventure}`;
    OuterAnchorTag.appendChild(button);
    td.appendChild(OuterAnchorTag);
    trow.append(td); 
    table.appendChild(trow);

   
  }

}

export { fetchReservations, addReservationToTable };
