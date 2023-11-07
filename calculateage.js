var dayinput = document.getElementById("day")
var monthinput = document.getElementById("month")
var yearinput = document.getElementById("year")
var pressbtn = document.getElementById("btn")

///on focus on input text clear the intial value and turn text color to black//

dayinput.addEventListener("focus", function() {
    dayinput.value = ""
    dayinput.style.color="black"
})
monthinput.addEventListener("focus", function() {
   monthinput.value = ""
   monthinput.style.color="black"
})
yearinput.addEventListener("focus", function() {
   yearinput.value = ""
   yearinput.style.color="black"
})

//hover only in display bigger than 375////
if (window.innerWidth > 375) {
  
    ///when hover on input boxes turn border to purple///
    dayinput.addEventListener("mouseenter", function () {
       dayinput.style.borderColor = "hsl(259, 100%, 65%)"
    })
    dayinput.addEventListener("mouseleave", function () {
       dayinput.style.borderColor = "hsl(0, 1%, 74%)"
    })
    ////
    monthinput.addEventListener("mouseenter", function () {
       monthinput.style.borderColor = "hsl(259, 100%, 65%)"
    })
    monthinput.addEventListener("mouseleave", function () {
       monthinput.style.borderColor = " hsl(0, 1%, 74%)"
    })
   ////
   yearinput.addEventListener("mouseenter", function () {
      yearinput.style.borderColor = "hsl(259, 100%, 65%)"
   })
   yearinput.addEventListener("mouseleave", function () {
     yearinput.style.borderColor = " hsl(0, 1%, 74%)"
   })
  
   ////hover on button/////
   pressbtn.addEventListener("mouseenter", function () {
     pressbtn.style.backgroundColor = "black"; // Change the background color to black on hover
   })
   pressbtn.addEventListener("mouseleave", function () {
     pressbtn.style.backgroundColor = ""; // Restore the original background color on mouse leave
   })
 
}

///////////////////age calculation when button is pressed///////////////
// Get the current date
var currentDate = new Date();
var todayyear = currentDate.getFullYear();
var todaymonth = currentDate.getMonth() + 1; // Months are zero-based
var todayday = currentDate.getDate();

function stylelabelalert(){
   var elements = document.getElementsByClassName("labelin")

      for (var i = 0; i < elements.length; i++) {
          elements[i].style.color = "red";
      }
}
function showage() {
  var dday = Number(document.getElementById("day").value);
  var mmonth = Number(document.getElementById("month").value);
  var yyear = Number(document.getElementById("year").value);

  // Clear existing alerts
  document.getElementById("dayAlert").style.display = "none";
  document.getElementById("monthAlert").style.display = "none";
  document.getElementById("yearAlert").style.display = "none";

  // Check if any of the input fields are empty or contain non-numeric values
  if (isNaN(dday) || isNaN(mmonth) || isNaN(yyear)) {
    if (isNaN(dday)) {
      document.getElementById("dayAlert").innerText = "This field is required"
      document.getElementById("dayAlert").style.display = "block"
      stylelabelalert()
    }
    if (isNaN(mmonth)) {
      document.getElementById("monthAlert").innerText = "This field is required";
      document.getElementById("monthAlert").style.display = "block";
      stylelabelalert()
    }
    if (isNaN(yyear)) {
      document.getElementById("yearAlert").innerText = "This field is required";
      document.getElementById("yearAlert").style.display = "block";
      stylelabelalert()
    }
    return; // Exit the function if any field is empty or contains a non-numeric value
  }

  // Check if month is within the range [1, 12]
  if (mmonth < 1 || mmonth > 12) {
    document.getElementById("monthAlert").innerText = "Must be a valid month";
    document.getElementById("monthAlert").style.display = "block";
    stylelabelalert()
    return;
  }

  // Check if the day is valid for the selected month
  if (
    (mmonth === 4 || mmonth === 6 || mmonth === 9 || mmonth === 11) &&
    (dday < 1 || dday > 30)
  ) {
    document.getElementById("dayAlert").innerText =
      "Must be a valid date";
    document.getElementById("dayAlert").style.display = "block"
    stylelabelalert()
    return;
  } else if (mmonth === 2) {
    // February
    var isLeapYear = (yyear % 4 === 0 && yyear % 100 !== 0) || (yyear % 400 === 0);
    if (!isLeapYear && (dday < 1 || dday > 28)) {
      document.getElementById("dayAlert").innerText ="Must be a valid date"
      document.getElementById("dayAlert").style.display = "block"
      stylelabelalert()
      return
    } else if (dday < 1 || dday > 29) {
      document.getElementById("dayAlert").innerText ="Must be a valid date"
      document.getElementById("dayAlert").style.display = "block"
      stylelabelalert()
      return
    }
  } else if (dday < 1 || dday > 31) {
    document.getElementById("dayAlert").innerText = "Must be a valid date";
    document.getElementById("dayAlert").style.display = "block";
    stylelabelalert()
    return;
  }

  // Check if the year is not greater than the current year
  if (yyear > todayyear) {
    document.getElementById("yearAlert").innerText = "Must be in the past";
    document.getElementById("yearAlert").style.display = "block";
    stylelabelalert()
    return;
  }

  // Calculate age
  var ageYear = todayyear - yyear;
  var ageMonth = todaymonth - mmonth;
  var ageDay = todayday - dday;

  // Adjust for negative values in days and months
  if (ageDay < 0) {
    ageMonth -= 1;
    ageDay += 30; // Assuming an average of 30 days per month
  }
  if (ageMonth < 0) {
    ageYear -= 1;
    ageMonth += 12;
  }

  // If the birthdate hasn't occurred this year yet, adjust the age
  if (todaymonth < mmonth || (todaymonth === mmonth && todayday < dday)) {
    ageYear -= 1
  }
  // Display the result
  document.getElementById("outyear").innerText =ageYear
  document.getElementById("outmonth").innerText = ageMonth
  document.getElementById("outday").innerText = ageDay

}

pressbtn.onclick = showage
