let edu = 0;
let skill = 0;
let work = 0;
let interest = 0;
let lang = 0;

function adder(event, element) {
  if (event.key === 'Enter') {
    if (element == 'skill') {
      $('#add_skill').click();
      document.getElementsByClassName('skill')[$('.skill').length - 1].focus();
    }
    else if (element == 'hobby') {
      $('#add_interest').click();
      document.getElementsByClassName('hobby')[$('.hobby').length - 1].focus();
    }
    else {
      $('#add_lang').click();
      document.getElementsByClassName('lang')[$('.lang').length - 1].focus();
    }
  }
}

//This is for color palette

$(document).ready(function () {
  $('.one').css("border", "3px solid white");
  $('.pelement').click(function () {
    $('.pelement').css("border", "3px solid transparent");
    $(this).css("border", "3px solid white");
    $('.left_side').css("background-color", $(this).css("background-color"));
    triggerAutoSave();
  });
  $('.t3 .pelement').click(function () {
    $('.t3 .pelement').css("border", "3px solid transparent");
    $(this).css("border", "3px solid white");
    let chosenColor = $(this).css("background-color");
    $('.t3 .top-section').css("background-color", chosenColor);
    $('.t3 .fa, .t3 .experience .job-title, .t3 .education .degree').css("color", chosenColor);
    triggerAutoSave();
  });
});

//  **********    **********    Validation Helpers   **********    **********

function validatePhone(phoneStr) {
  if (!phoneStr || phoneStr.trim() === '') return true;
  const phoneRegex = /^\+?[\d\s\-\(\)]{7,20}$/;
  return phoneRegex.test(phoneStr.trim());
}

function validateURL(urlStr) {
  if (!urlStr || urlStr.trim() === '') return true;
  const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
  return urlRegex.test(urlStr.trim());
}

function toggChk(el) {
  let ele = $(el).parent('div').parent('div').prev().find("input")[0];
  ele.disabled = !ele.disabled;
  if ($(el).is(':checked')) {
    $(ele).val('');
    $(ele).parent('div').css({ 'display': 'none' });
  }
  else {
    $(ele).parent('div').css({ 'display': 'block' });
  }
  triggerAutoSave();
}

function showFieldError(el, msg) {
  $(el).css({ "border": "1.5px solid red" });
  let $parent = $(el).parent();
  let $errSpan = $parent.find('.invalid-feedback-msg');
  if (!$errSpan.length) {
    $parent.append(`<span class="invalid-feedback-msg text-danger small mt-1 d-block">${msg}</span>`);
  } else {
    $errSpan.text(msg).show();
  }
}

function clearFieldError(el) {
  $(el).css({ "border": "1.5px solid rgb(206, 212, 218)" });
  $(el).parent().find('.invalid-feedback-msg').remove();
}

function validate_chg_color(el) {
  let isValid = true;
  let errorMsg = "This field is required.";

  if ($(el).hasClass('end_date')) {
    let chk_pre = $(el).parent().next('div').find('input')[0].checked;
    if (chk_pre) {
      clearFieldError(el);
      return true;
    }
  }

  let val = $.trim($(el).val());
  let id = $(el).attr('id');

  if ($(el).attr('type') == 'checkbox') {
    clearFieldError(el);
    return true;
  }
  else if (id === 'number' && val !== '') {
    isValid = validatePhone(val);
    errorMsg = "Please enter a valid phone number.";
  }
  else if ((id === 'website' || id === 'linkedIn') && val !== '') {
    isValid = validateURL(val);
    errorMsg = "Please enter a valid URL (e.g. https://example.com).";
  }
  else if ($(el).attr('type') === 'email' && val !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(val);
    errorMsg = "Please enter a valid email address.";
  }
  else if (val == '' || val == 'Select level' || val == 'Select Country' || val == 'Select State' || val == 'Select City') {
    isValid = false;
    errorMsg = "This field is required.";
  }

  if (!isValid) {
    showFieldError(el, errorMsg);
  } else {
    clearFieldError(el);
  }
  return isValid;
}

//  **********    **********  Form - 1  Validation  **********    **********

function validate_form1(btn) {
  let finalValid = true;
  let isValid = true;
  let img_div = document.getElementsByClassName('imgContainer')[0];
  if ($('#inpImg').val() == "" && $('#image').attr('src') == "") { validate_chg_color(img_div); isValid = false; finalValid = false; }
  $('#form1').find('select').each(function () {
    let val = $(this).val();
    if (val === 'Country' || val === 'State' || val === 'City' || val === '' || val === null) {
      isValid = validate_chg_color(this);
      if (!isValid) { finalValid = false; }
    } else {
      $(this).css({ "border": "1.5px solid rgb(206, 212, 218)" });
    }
  });
  $('#form1').find('input').each(function () {
    if ($(this).attr('id') == 'linkedIn' || $(this).attr('id') == 'website') {
      if (!validate_chg_color(this)) finalValid = false;
    }
    else {
      isValid = validate_chg_color(this);
      if (!isValid) { finalValid = false; }
    }
  });
  return finalValid;
}

//  **********  ********** Work Experience  **********  **********

function updateWork() {
  for (let i = 0; i < $('#accordionWork .accordion-item').length; i++) {
    let a = ($(`#accordionWork .accordion-item:nth-child(${i + 1}) .job_title`).val().trim() == '') ? 'Work Experience' : $(`#accordionWork .accordion-item:nth-child(${i + 1}) .job_title`).val().trim();

    let c = ($(`#accordionWork .accordion-item:nth-child(${i + 1}) .company_name`).val().trim() == '') ? '' : ' at ' + $(`#accordionWork .accordion-item:nth-child(${i + 1}) .company_name`).val().trim();

    $(`#accordionWork .accordion-item:nth-child(${i + 1}) .accordion-button`).html(a + c);
  }
}

function wmakeVisible() {
  $("#accordionWork .accordion-header").css("display", "block");
  updateWork();
}

function delWork2(event) {
  event.preventDefault();
  if ($("#accordionWork .accordion-item").length > 1) {
    wmakeVisible();
    event.target.parentElement.parentElement.parentElement.remove();
    triggerAutoSave();
  }
  event.stopPropagation();
}

$('.fc2').click(function () {
  work = 1;
  $('.fc2').off('click');
});

let workAdder = $("#accordionWork").html();
let workCounter = 1;

$("#add_work").click(function (e) {
  let isValid = true;
  let finalValid = true;
  $("#accordionWork .accordion-item:last-child").find("input").each(function () { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } });

  if (!finalValid) {
    e.preventDefault();
  }
  else {
    updateWork();
    workCounter++;
    if ($("#accordionWork .accordion-item").length > 0) {
      $("#accordionWork .accordion-header").css("display", "block");
      let count = $("#accordionWork .accordion-item").length;
      if (document.getElementById("accordionWork").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
        document.getElementById("accordionWork").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-button")[0].click();
      }
    }
    $("#accordionWork").append(workAdder);
    $("#accordionWork .accordion-header").last().attr("id", "wheading" + workCounter);
    $("#accordionWork .accordion-collapse").last().attr("aria-labelledby", "wheading" + workCounter);
    $("#accordionWork .accordion-collapse").last().attr("id", "wcollapse" + workCounter);
    $("#accordionWork .accordion-button").last().attr("data-bs-target", "#wcollapse" + workCounter);
    $("#accordionWork .accordion-button").last().attr("aria-controls", "wcollapse" + workCounter);
    triggerAutoSave();
  }
});

//  **********  ********** Education and Qualifications **********  **********

function updateEdu() {
  for (let i = 0; i < $('#accordionEdu .accordion-item').length; i++) {

    let a = ($(`#accordionEdu .accordion-item:nth-child(${i + 1}) .degree`).val().trim() == '') ? 'Education' : $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .degree`).val().trim();

    let c = ($(`#accordionEdu .accordion-item:nth-child(${i + 1}) .school`).val().trim() == '') ? '' : ' from ' + $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .school`).val().trim();

    $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .accordion-button`).html(a + c);
  }
}

function emakeVisible() {
  $("#accordionEdu .accordion-header").css("display", "block");
  updateEdu();
}

function delEdu2(event) {
  event.preventDefault();
  if ($("#accordionEdu .accordion-item").length > 1) {
    emakeVisible();
    event.target.parentElement.parentElement.parentElement.remove();
    triggerAutoSave();
  }
  event.stopPropagation();
}

$('.fc1').click(function () {
  edu = 1;
  $('.fc1').off('click');
});

let eduAdder = $("#accordionEdu").html();
let eduCounter = 1;

$("#add_edu").click(function (e) {
  let isValid = true;
  let finalValid = true;
  $('#accordionEdu .accordion-item:last-child').find('input').each(function () { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } });

  if (!finalValid) {
    e.preventDefault();
  }
  else {
    updateEdu();
    eduCounter++;
    if ($("#accordionEdu .accordion-item").length > 0) {
      $("#accordionEdu .accordion-header").css("display", "block");
      let count = $("#accordionEdu .accordion-item").length;
      if (document.getElementById("accordionEdu").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
        document.getElementById("accordionEdu").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-button")[0].click();
      }
    }
    $("#accordionEdu").append(eduAdder);
    $("#accordionEdu .accordion-header").last().attr("id", "eheading" + eduCounter);
    $("#accordionEdu .accordion-collapse").last().attr("aria-labelledby", "eheading" + eduCounter);
    $("#accordionEdu .accordion-collapse").last().attr("id", "ecollapse" + eduCounter);
    $("#accordionEdu .accordion-button").last().attr("data-bs-target", "#ecollapse" + eduCounter);
    $("#accordionEdu .accordion-button").last().attr("aria-controls", "ecollapse" + eduCounter);
    triggerAutoSave();
  }
});

//  **********  ********** Skills **********  **********

function updateSkill() {
  for (let i = 0; i < $('#accordionSkill .accordion-item').length; i++) {

    let a = ($(`#accordionSkill .accordion-item:nth-child(${i + 1}) .skill`).val().trim() == '') ? 'Skill' : $(`#accordionSkill .accordion-item:nth-child(${i + 1}) .skill`).val().trim();

    $(`#accordionSkill .accordion-item:nth-child(${i + 1}) .accordion-button`).html(a);
  }
}

function smakeVisible() {
  $("#accordionSkill .accordion-header").css("display", "block");
  updateSkill();
}

function delSkill2(event) {
  event.preventDefault();
  if ($("#accordionSkill .accordion-item").length > 1) {
    smakeVisible();
    event.target.parentElement.parentElement.parentElement.remove();
    triggerAutoSave();
  }
  event.stopPropagation();
}

$('.fc3').click(function () {
  skill = 1;
  $('.fc3').off('click');
});

let skillAdder = $("#accordionSkill").html();
let skillCounter = 1;

$("#add_skill").click(function (e) {
  let isValid = true;
  let finalValid = true;
  $("#accordionSkill .accordion-item:last-child").find("input, select").each(function () { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } });
  if (!finalValid) {
    e.preventDefault();
  }
  else {
    updateSkill();
    skillCounter++;
    if ($("#accordionSkill .accordion-item").length > 0) {
      $("#accordionSkill .accordion-header").css("display", "block");
      let count = $("#accordionSkill .accordion-item").length;
      if (document.getElementById("accordionSkill").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
        document.getElementById("accordionSkill").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-button")[0].click();
      }
    }
    $("#accordionSkill").append(skillAdder);
    $("#accordionSkill .accordion-header").last().attr("id", "sheading" + skillCounter);
    $("#accordionSkill .accordion-collapse").last().attr("aria-labelledby", "sheading" + skillCounter);
    $("#accordionSkill .accordion-collapse").last().attr("id", "scollapse" + skillCounter);
    $("#accordionSkill .accordion-button").last().attr("data-bs-target", "#scollapse" + skillCounter);
    $("#accordionSkill .accordion-button").last().attr("aria-controls", "scollapse" + skillCounter);
    triggerAutoSave();
  }
});

//  **********  ********** Interests  **********  **********

function updateInterest() {
  for (let i = 0; i < $('#accordionInt .accordion-item').length; i++) {

    let a = ($(`#accordionInt .accordion-item:nth-child(${i + 1}) .hobby`).val().trim() == '') ? 'Hobby' : $(`#accordionInt .accordion-item:nth-child(${i + 1}) .hobby`).val().trim();

    $(`#accordionInt .accordion-item:nth-child(${i + 1}) .accordion-button`).html(a);
  }
}

function imakeVisible() {
  $("#accordionInt .accordion-header").css("display", "block");
  updateInterest();
}

function delInt2(event) {
  event.preventDefault();
  if ($("#accordionInt .accordion-item").length > 1) {
    imakeVisible();
    event.target.parentElement.parentElement.parentElement.remove();
    triggerAutoSave();
  }
  event.stopPropagation();
}

$('.fc4').click(function () {
  interest = 1;
  $('.fc4').off('click');
});

let interestAdder = $("#accordionInt").html();
let interestCounter = 1;

$("#add_interest").click(function (e) {
  let isValid = true;
  let finalValid = true;
  $("#accordionInt .accordion-item:last-child").find('input').each(function () { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } });
  if (!finalValid) {
    e.preventDefault();
  }
  else {
    updateInterest();
    interestCounter++;
    if ($("#accordionInt .accordion-item").length > 0) {
      $("#accordionInt .accordion-header").css("display", "block");
      let count = $("#accordionInt .accordion-item").length;
      if (document.getElementById("accordionInt").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
        document.getElementById("accordionInt").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-button")[0].click();
      }
    }
    $("#accordionInt").append(interestAdder);
    $("#accordionInt .accordion-header").last().attr("id", "iheading" + interestCounter);
    $("#accordionInt .accordion-collapse").last().attr("aria-labelledby", "iheading" + interestCounter);
    $("#accordionInt .accordion-collapse").last().attr("id", "icollapse" + interestCounter);
    $("#accordionInt .accordion-button").last().attr("data-bs-target", "#icollapse" + interestCounter);
    $("#accordionInt .accordion-button").last().attr("aria-controls", "icollapse" + interestCounter);
    triggerAutoSave();
  }
});

//  ********** Languages **********

function updateLang() {
  for (let i = 0; i < $('#accordionLang .accordion-item').length; i++) {

    let a = ($(`#accordionLang .accordion-item:nth-child(${i + 1}) .lang`).val().trim() == '') ? 'Language' : $(`#accordionLang .accordion-item:nth-child(${i + 1}) .lang`).val().trim();

    $(`#accordionLang .accordion-item:nth-child(${i + 1}) .accordion-button`).html(a);
  }
}

function lmakeVisible() {
  $("#accordionLang .accordion-header").css("display", "block");
  updateLang();
}

function delLang2(event) {
  event.preventDefault();
  if ($("#accordionLang .accordion-item").length > 1) {
    lmakeVisible();
    event.target.parentElement.parentElement.parentElement.remove();
    triggerAutoSave();
  }
  event.stopPropagation();
}

$('.fc6').click(function () {
  lang = 1;
  $('.fc6').off('click');
});

let langAdder = $("#accordionLang").html();
let langCounter = 1;

$("#add_lang").click(function (e) {
  let isValid = true;
  let finalValid = true;
  $("#accordionLang .accordion-item:last-child").find('input').each(function () { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } });
  if (!finalValid) {
    e.preventDefault();
  }
  else {
    updateLang();
    langCounter++;
    if ($("#accordionLang .accordion-item").length > 0) {
      $("#accordionLang .accordion-header").css("display", "block");
      let count = $("#accordionLang .accordion-item").length;
      if (document.getElementById("accordionLang").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
        document.getElementById("accordionLang").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-button")[0].click();
      }
    }
    $("#accordionLang").append(langAdder);
    $("#accordionLang .accordion-header").last().attr("id", "lheading" + langCounter);
    $("#accordionLang .accordion-collapse").last().attr("aria-labelledby", "lheading" + langCounter);
    $("#accordionLang .accordion-collapse").last().attr("id", "lcollapse" + langCounter);
    $("#accordionLang .accordion-button").last().attr("data-bs-target", "#lcollapse" + langCounter);
    $("#accordionLang .accordion-button").last().attr("aria-controls", "lcollapse" + langCounter);
    triggerAutoSave();
  }
});

//  **********    **********    Country, state and city options   **********    **********

const fallbackCountries = [
  "India", "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Japan", "China", "Brazil", "Mexico",
  "Singapore", "United Arab Emirates", "Other"
];

function loadLocationFallback() {
  if ($('#country option').length <= 1) {
    $('#country').empty().append('<option value="">Select Country</option>');
    fallbackCountries.forEach(c => $('#country').append(`<option value="${c}">${c}</option>`));
  }
}

function handleStateFallback() {
  if ($('#state option').length <= 1) {
    $('#state').empty().append('<option value="">Select State</option>');
    ['General State/Province', 'California', 'New York', 'Texas', 'Ontario', 'London', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Other'].forEach(s => $('#state').append(`<option value="${s}">${s}</option>`));
  }
}

function handleCityFallback() {
  if ($('#city option').length <= 1) {
    $('#city').empty().append('<option value="">Select City</option>');
    ['General City', 'New York', 'Los Angeles', 'Toronto', 'London', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Ahmedabad', 'Other'].forEach(c => $('#city').append(`<option value="${c}">${c}</option>`));
  }
}

function getCountries() {
  loadLocationFallback();
  getStates();
}

function getStates() {
  handleStateFallback();
  getCities();
}

function getCities() {
  handleCityFallback();
}

$('#country').on('change click', function () {
  getStates();
});

$('#state').on('change click', function () {
  getCities();
});

//  **********    **********    Profile Images    **********    **********

function resetImagePreview() {
  let previewText = document.getElementById('previewText');
  let image = document.getElementById('image');
  let imgContainer = document.getElementsByClassName('imgContainer')[0];

  if (previewText) previewText.style.display = null;
  if (image) {
    image.style.display = null;
    $('#image').attr('src', '');
  }
  if (imgContainer) imgContainer.style.border = null;
}

$('.imgContainer').click(function () {
  $('#inpImg').click();
});

$('#inpImg').change(function () {
  const file = this.files[0];
  if (file) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      alert("Invalid image format! Please upload an image file (JPG, JPEG, PNG, GIF, or WEBP).");
      this.value = "";
      resetImagePreview();
      return;
    }

    // Validate file size (max 3 MB)
    const maxSizeInBytes = 3 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert("Image file size exceeds the 3 MB limit. Please select a smaller file.");
      this.value = "";
      resetImagePreview();
      return;
    }

    const reader = new FileReader();
    $('#previewText').css('display', 'none');
    $('.imgContainer').css('border', 'none');
    $('#image').css('display', 'block');
    reader.addEventListener('load', function () {
      $('#image').attr('src', this.result);
      triggerAutoSave();
    });
    reader.readAsDataURL(file);
  }
  else {
    resetImagePreview();
    triggerAutoSave();
  }
});

//  **********    **********    Generating CV    **********    **********

function templateRadioSelector(ele) {
  for (let i = 0; i < $('#form3 .card').length; i++) {
    $(`#form3 .card:nth-child(${i + 1})`).css('background-color', 'white');
  }
  $(ele).css('background-color', '#80808088');
  $(ele).find('input').prop('checked', true);
  triggerAutoSave();
}

//  **********    **********  LocalStorage Persistence Engine   **********    **********

let autoSaveTimeout = null;

function triggerAutoSave() {
  if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
  $('#saveStatus').text('Saving...').css('opacity', '1');
  autoSaveTimeout = setTimeout(function () {
    saveDraft();
  }, 400);
}

function saveDraft() {
  try {
    let draft = {
      fname: $('#fname').val() || '',
      lname: $('#lname').val() || '',
      email: $('#email').val() || '',
      number: $('#number').val() || '',
      address: $('#address').val() || '',
      country: $('#country').val() || '',
      state: $('#state').val() || '',
      city: $('#city').val() || '',
      zip: $('#zip').val() || '',
      gender: $('#gender').val() || '',
      dob: $('#dob').val() || '',
      linkedIn: $('#linkedIn').val() || '',
      website: $('#website').val() || '',
      resumeTitle: $('#resume_title').val() || '',
      t3Color: $('.t3 .top-section').css('background-color') || '',
      imageSrc: $('#image').attr('src') || '',
      profile: $('#profile').val() || '',
      achievements: $('#achv_description').val() || '',
      selectedTemplate: $('input[name="selected_template"]:checked').attr('id') || 'template_1',
      education: [],
      work: [],
      skills: [],
      hobbies: [],
      languages: []
    };

    $('#accordionEdu .accordion-item').each(function () {
      draft.education.push({
        degree: $(this).find('.degree').val() || '',
        school: $(this).find('.school').val() || '',
        startDate: $(this).find('.edu_start').val() || '',
        endDate: $(this).find('.end_date').val() || '',
        isPresent: $(this).find('.end_date_toggle').prop('checked') || false
      });
    });

    $('#accordionWork .accordion-item').each(function () {
      draft.work.push({
        jobTitle: $(this).find('.job_title').val() || '',
        companyName: $(this).find('.company_name').val() || '',
        startDate: $(this).find('.work_start').val() || '',
        endDate: $(this).find('.end_date').val() || '',
        isPresent: $(this).find('.end_date_toggle').prop('checked') || false,
        description: $(this).find('.work_desc').val() || ''
      });
    });

    $('#accordionSkill .accordion-item').each(function () {
      draft.skills.push({
        skill: $(this).find('.skill').val() || ''
      });
    });

    $('#accordionInt .accordion-item').each(function () {
      draft.hobbies.push({
        hobby: $(this).find('.hobby').val() || ''
      });
    });

    $('#accordionLang .accordion-item').each(function () {
      draft.languages.push({
        language: $(this).find('.lang').val() || ''
      });
    });

    localStorage.setItem('resumeBuilderDraft', JSON.stringify(draft));
    $('#saveStatus').text('Draft saved').css('opacity', '1');
    setTimeout(function () {
      $('#saveStatus').css('opacity', '0.6');
    }, 2000);
  } catch (e) {
    console.warn('Could not save draft to localStorage:', e);
    $('#saveStatus').text('Save error').css('opacity', '1');
  }
}

function clearFormAndDraft() {
  if (confirm("Are you sure you want to clear all entered data and start fresh? This will delete your saved draft.")) {
    localStorage.removeItem('resumeBuilderDraft');
    location.reload();
  }
}

function appendEduItemWithData(item, count) {
  $("#accordionEdu").append(eduAdder);
  let $item = $("#accordionEdu .accordion-item").last();
  $item.find('.degree').val(item.degree || '');
  $item.find('.school').val(item.school || '');
  $item.find('.edu_start').val(item.startDate || '');
  $item.find('.end_date').val(item.endDate || '');
  if (item.isPresent) {
    $item.find('.end_date_toggle').prop('checked', true);
    let $endInput = $item.find('.end_date');
    $endInput.val('').prop('disabled', true).parent('div').css('display', 'none');
  }
  $item.find('.accordion-header').attr("id", "eheading" + count);
  $item.find('.accordion-collapse').attr("aria-labelledby", "eheading" + count).attr("id", "ecollapse" + count);
  $item.find('.accordion-button').attr("data-bs-target", "#ecollapse" + count).attr("aria-controls", "ecollapse" + count);
  updateEdu();
}

function appendWorkItemWithData(item, count) {
  $("#accordionWork").append(workAdder);
  let $item = $("#accordionWork .accordion-item").last();
  $item.find('.job_title').val(item.jobTitle || '');
  $item.find('.company_name').val(item.companyName || '');
  $item.find('.work_start').val(item.startDate || '');
  $item.find('.end_date').val(item.endDate || '');
  $item.find('.work_desc').val(item.description || '');
  if (item.isPresent) {
    $item.find('.end_date_toggle').prop('checked', true);
    let $endInput = $item.find('.end_date');
    $endInput.val('').prop('disabled', true).parent('div').css('display', 'none');
  }
  $item.find('.accordion-header').attr("id", "wheading" + count);
  $item.find('.accordion-collapse').attr("aria-labelledby", "wheading" + count).attr("id", "wcollapse" + count);
  $item.find('.accordion-button').attr("data-bs-target", "#wcollapse" + count).attr("aria-controls", "wcollapse" + count);
  updateWork();
}

function appendSkillItemWithData(item, count) {
  $("#accordionSkill").append(skillAdder);
  let $item = $("#accordionSkill .accordion-item").last();
  $item.find('.skill').val(item.skill || '');
  $item.find('.accordion-header').attr("id", "sheading" + count);
  $item.find('.accordion-collapse').attr("aria-labelledby", "sheading" + count).attr("id", "scollapse" + count);
  $item.find('.accordion-button').attr("data-bs-target", "#scollapse" + count).attr("aria-controls", "scollapse" + count);
  updateSkill();
}

function appendHobbyItemWithData(item, count) {
  $("#accordionInt").append(interestAdder);
  let $item = $("#accordionInt .accordion-item").last();
  $item.find('.hobby').val(item.hobby || '');
  $item.find('.accordion-header').attr("id", "iheading" + count);
  $item.find('.accordion-collapse').attr("aria-labelledby", "iheading" + count).attr("id", "icollapse" + count);
  $item.find('.accordion-button').attr("data-bs-target", "#icollapse" + count).attr("aria-controls", "icollapse" + count);
  updateInterest();
}

function appendLangItemWithData(item, count) {
  $("#accordionLang").append(langAdder);
  let $item = $("#accordionLang .accordion-item").last();
  $item.find('.lang').val(item.language || '');
  $item.find('.accordion-header').attr("id", "lheading" + count);
  $item.find('.accordion-collapse').attr("aria-labelledby", "lheading" + count).attr("id", "lcollapse" + count);
  $item.find('.accordion-button').attr("data-bs-target", "#lcollapse" + count).attr("aria-controls", "lcollapse" + count);
  updateLang();
}

function loadDraft() {
  let savedData = localStorage.getItem('resumeBuilderDraft');
  if (!savedData) return;

  try {
    let draft = JSON.parse(savedData);
    if (!draft) return;

    if (draft.fname) $('#fname').val(draft.fname);
    if (draft.lname) $('#lname').val(draft.lname);
    if (draft.email) $('#email').val(draft.email);
    if (draft.number) $('#number').val(draft.number);
    if (draft.address) $('#address').val(draft.address);
    if (draft.country) $('#country').val(draft.country);
    if (draft.state) $('#state').val(draft.state);
    if (draft.city) $('#city').val(draft.city);
    if (draft.zip) $('#zip').val(draft.zip);
    if (draft.gender) $('#gender').val(draft.gender);
    if (draft.dob) $('#dob').val(draft.dob);
    if (draft.linkedIn) $('#linkedIn').val(draft.linkedIn);
    if (draft.website) $('#website').val(draft.website);
    if (draft.resumeTitle) $('#resume_title').val(draft.resumeTitle);
    if (draft.t3Color) {
      $('.t3 .top-section').css("background-color", draft.t3Color);
      $('.t3 .fa, .t3 .experience .job-title, .t3 .education .degree').css("color", draft.t3Color);
    }

    if (draft.imageSrc && draft.imageSrc !== '') {
      $('#previewText').css('display', 'none');
      $('.imgContainer').css('border', 'none');
      $('#image').attr('src', draft.imageSrc).css('display', 'block');
    }

    if (draft.profile) $('#profile').val(draft.profile);
    if (draft.achievements) $('#achv_description').val(draft.achievements);

    if (draft.selectedTemplate) {
      $(`#${draft.selectedTemplate}`).prop('checked', true);
      let cardElem = $(`#${draft.selectedTemplate}`).closest('.card')[0];
      if (cardElem) templateRadioSelector(cardElem);
    }

    // Education entries
    if (draft.education && draft.education.length > 0) {
      $('#accordionEdu').empty();
      draft.education.forEach(function (eduItem, idx) {
        let count = idx + 1;
        appendEduItemWithData(eduItem, count);
      });
    }

    // Work Experience entries
    if (draft.work && draft.work.length > 0) {
      $('#accordionWork').empty();
      draft.work.forEach(function (workItem, idx) {
        let count = idx + 1;
        appendWorkItemWithData(workItem, count);
      });
    }

    // Skills
    if (draft.skills && draft.skills.length > 0) {
      $('#accordionSkill').empty();
      draft.skills.forEach(function (skillItem, idx) {
        let count = idx + 1;
        appendSkillItemWithData(skillItem, count);
      });
    }

    // Hobbies
    if (draft.hobbies && draft.hobbies.length > 0) {
      $('#accordionInt').empty();
      draft.hobbies.forEach(function (hobbyItem, idx) {
        let count = idx + 1;
        appendHobbyItemWithData(hobbyItem, count);
      });
    }

    // Languages
    if (draft.languages && draft.languages.length > 0) {
      $('#accordionLang').empty();
      draft.languages.forEach(function (langItem, idx) {
        let count = idx + 1;
        appendLangItemWithData(langItem, count);
      });
    }

    $('#saveStatus').text('Draft restored').css('opacity', '1');
    setTimeout(function () {
      $('#saveStatus').css('opacity', '0.6');
    }, 2500);

  } catch (e) {
    console.error('Error loading draft from localStorage:', e);
  }
}

$(document).ready(function () {
  loadLocationFallback();
  handleStateFallback();
  handleCityFallback();

  loadDraft();

  $(document).on('input change', '#form1 input, #form1 select, #form2 input, #form2 select, #form2 textarea, #form3 input', function () {
    triggerAutoSave();
  });
});