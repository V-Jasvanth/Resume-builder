function template_selector() {
    if ($('#template_1').prop('checked') == true) {
        generateCV('Template_1');
    }
    else if ($('#template_2').prop('checked') == true) {
        generateCV('Template_2');
    }
    else if ($('#template_3').prop('checked') == true) {
        generateCV('Template_3');
    }
    else {
        alert("Please select a template.");
    }
}

function visibler() {
    $(`.dwnldimage`).css('display', 'inline-block');
    $(`.printCv`).css('display', 'inline-block');
    $(`.back-to-form`).css('display', 'flex');
    $(`.palette`).css('display', 'block');
}

function printer() {
    $(`.dwnldimage`).css('display', 'none');
    $(`.printCv`).css('display', 'none');
    $(`.back-to-form`).css('display', 'none');
    $(`.palette`).css('display', 'none');
    window.print();
    setTimeout(visibler, 500);
}

function downloadCanvasAsImage(canvas, filename) {
    filename = filename || 'resume.png';
    if (canvas.toBlob) {
        canvas.toBlob(function (blob) {
            let link = document.createElement('a');
            link.download = filename;
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        }, 'image/png');
    } else {
        let link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

$(document).ready(function() {
    $(document).on('click', '.printCv', printer);
    $(document).on('click', '.dwnldimage', function() {
        let visibleTemplate = $('.template:visible');
        if (!visibleTemplate.length) return;
        let templateId = visibleTemplate.attr('id');
        let targetElem = visibleTemplate.find('#target')[0] || visibleTemplate.find('.main')[0] || visibleTemplate[0];
        if (targetElem) {
            html2canvas(targetElem).then(function(canvas) {
                downloadCanvasAsImage(canvas, `${templateId}_resume.png`);
            });
        }
    });
});

function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAndFormatNewlines(str) {
    if (!str) return '';
    return escapeHTML(str).replace(/\r?\n/g, '<br />');
}

function getValidYear(dateVal) {
    if (!dateVal) return null;
    let d = new Date(dateVal);
    let yr = d.getFullYear();
    return isNaN(yr) ? null : yr;
}

function formatDateRange(startVal, endVal, isPresent) {
    let startYear = getValidYear(startVal);
    let endYear = isPresent ? 'Present' : getValidYear(endVal);
    
    if (startYear && endYear) {
        return `${startYear} - ${endYear}`;
    } else if (startYear) {
        return `${startYear}`;
    } else if (endYear) {
        return `${endYear}`;
    }
    return '';
}

function generateCV(template) {

    document.getElementById('form3').classList.remove('active');
    if (template == 'Template_3') { document.getElementById(template).style.display = 'block'; }
    else { document.getElementById(template).style.display = 'flex'; }

    document.getElementById('nav').style.display = 'none';

    //  **********      Profile Image       *********

    let file = document.getElementById('inpImg').files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let profImg = document.getElementById(`${template}`).getElementsByClassName('profilepic')[0];
            if (profImg) profImg.src = reader.result;
        };
    }

    // ************************************ First Form *******************************

    let dobVal = $('#dob').val();
    if (dobVal) {
        let dob = new Date(dobVal);
        if (!isNaN(dob.getTime())) {
            let formattedDob = String(dob.getDate()).padStart(2, '0') + "/" + String(dob.getMonth() + 1).padStart(2, '0') + "/" + dob.getFullYear();
            $(`#${template} #t_dob`).text(formattedDob);
        } else {
            $(`#${template} #t_dob`).text('');
        }
    } else {
        $(`#${template} #t_dob`).text('');
    }

    let fullName = escapeHTML($('#fname').val()) + " " + escapeHTML($('#lname').val());
    $(`#${template} #t_name`).html(fullName);
    $(`#${template} #t_gender`).text($('#gender').val() || '');
    $(`#${template} #t_email`).text($('#email').val() || '');
    $(`#${template} #t_number`).text($('#number').val() || '');
    
    let resumeTitle = $('#resume_title').val() ? $('#resume_title').val().trim() : 'Curriculum Vitae';
    $('.t2 .upper').text(resumeTitle);

    let cityVal = $('#city').val();
    let stateVal = $('#state').val();
    let countryVal = $('#country').val();
    let addressLine = escapeHTML($('#address').val()) + "<br>" + escapeHTML($('#zip').val()) + "<br>" + (cityVal ? escapeHTML(cityVal) + ", " : "") + (stateVal ? escapeHTML(stateVal) + ", " : "") + (countryVal ? escapeHTML(countryVal) : "");
    $(`#${template} #t_address`).html(addressLine);

    let websiteVal = $('#website').val().trim();
    if (websiteVal == "") {
        $(`#${template} #t_website`).parent().css('display', 'none');
    }
    else {
        $(`#${template} #t_website`).parent().css('display', 'block');
        $(`#${template} #t_website`).text(websiteVal);
    }

    let linkedinVal = $('#linkedIn').val().trim();
    if (linkedinVal == "") {
        $(`#${template} #t_linkedIn`).parent().css('display', 'none');
    }
    else {
        $(`#${template} #t_linkedIn`).parent().css('display', 'block');
        $(`#${template} #t_linkedIn`).text(linkedinVal);
    }

    // ************************ Second form *************************

    //  **********    Education    **********

    let edu_items = $('#accordionEdu .accordion-item').length;
    for (let i = 0; i < edu_items; i++) {
        let degree = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .degree`).val().trim();
        let school = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .school`).val().trim();
        let srtVal = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .edu_start`).val();
        let endVal = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .end_date`).val();
        let isPresent = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .end_date_toggle`).prop('checked');
        let dateStr = formatDateRange(srtVal, endVal, isPresent);

        if (degree == "" && school == "") {
            continue;
        }

        let safeDegree = escapeHTML(degree);
        let safeSchool = escapeHTML(school);
        let safeDisplayDate = escapeHTML(dateStr);

        if (template == "Template_1") {
            $('.t1 .left_side .education ul').append(`<li>
            ${safeDisplayDate ? `<h5>${safeDisplayDate}</h5>` : ''}
            ${safeDegree ? `<h4>${safeDegree}</h4>` : ''}
            ${safeSchool ? `<h4>${safeSchool}</h4>` : ''}
            </li>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower_right .education .content').append(`
            <div class="con">
                ${safeDisplayDate ? `<h4 class="time">${safeDisplayDate}</h4>` : ''}
                ${safeDegree ? `<h4 class="degree">${safeDegree}</h4>` : ''}
                ${safeSchool ? `<h4 class="uni">${safeSchool}</h4>` : ''}
            </div>`);
        }
        else if (template == 'Template_3') {
            let degDate = safeDegree + (safeDisplayDate ? ` (${safeDisplayDate})` : '');
            $('.t3 .education').append(`<p class="degree">${degDate}</p><p class="par-4">${safeSchool}</p>`);
        }
    }

    //  **********    Work    **********

    let work_items = $('#accordionWork .accordion-item').length;
    for (let i = 0; i < work_items; i++) {
        let job_title = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .job_title`).val().trim();
        let company_name = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .company_name`).val().trim();
        let srtVal = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .work_start`).val();
        let endVal = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .end_date`).val();
        let isPresent = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .end_date_toggle`).prop('checked');
        let dateStr = formatDateRange(srtVal, endVal, isPresent);
        let work_desc = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .work_desc`).val().trim();

        if (job_title == "" && company_name == "") {
            continue;
        }

        let safeJobTitle = escapeHTML(job_title);
        let safeCompany = escapeHTML(company_name);
        let safeDisplayDate = escapeHTML(dateStr);
        let safeWorkDesc = escapeAndFormatNewlines(work_desc);

        if (template == "Template_1") {
            $('.t1 .right_side .experience').append(
                `<div class="box">
                <div class="year_company">
                    ${safeDisplayDate ? `<h5>${safeDisplayDate}</h5>` : ''}
                    ${safeCompany ? `<h5>${safeCompany}</h5>` : ''}
                </div>
                <div class="text">
                    ${safeJobTitle ? `<h4>${safeJobTitle}</h4>` : ''}
                    ${safeWorkDesc ? `<p>${safeWorkDesc}</p>` : ''}
                </div>
            </div>`
            );
        }
        else if (template == 'Template_2') {
            $('.t2 .lower_right .experience .content').append(`<div class="con">
            <div class="time">${safeDisplayDate ? `<h4>${safeDisplayDate}</h4>` : ''}${safeCompany ? `<h4>${safeCompany}</h4>` : ''}</div>
            <div class="box"><div class="text">${safeJobTitle}</div><div class="exp">${safeWorkDesc}</div></div>
        </div>`);
        }
        else if (template == 'Template_3') {
            let titleComp = safeJobTitle + (safeCompany ? ` at ${safeCompany}` : '') + (safeDisplayDate ? ` (${safeDisplayDate})` : '');
            $('.t3 .content-box .experience').append(`<p class="job-title">${titleComp}</p>
            <p class="par-4">${safeWorkDesc}</p>`);
        }
    }

    //  **********    Skills    **********

    let skill_items = $('#accordionSkill .accordion-item').length;
    for (let i = 0; i < skill_items; i++) {
        let skill = $(`#accordionSkill .accordion-item:nth-child(${i + 1}) .skill`).val().trim();

        if (skill == "") {
            continue;
        }
        let safeSkill = escapeHTML(skill);

        if (template == "Template_1") {
            $('.t1 .right_side .skills .box').append(`<h4>${safeSkill}</h4>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower .lower_left .skills .content').append(`<div class="skill">${safeSkill}</div>`);
        }
        else if (template == 'Template_3') {
            $('.t3 .skills').append(`<li><span>${safeSkill}</span></li>`);
        }
    }

    //  **********    Interest    **********

    let interest_items = $('#accordionInt .accordion-item').length;
    for (let i = 0; i < interest_items; i++) {
        let interest = $(`#accordionInt .accordion-item:nth-child(${i + 1}) .hobby`).val().trim();

        if (interest == "") {
            continue;
        }
        let safeInterest = escapeHTML(interest);

        if (template == "Template_1") {
            $('.t1 .right_side .interest ul').append(`
            <li>${safeInterest}</li>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower .lower_left .interests .content').append(`<div class="con">${safeInterest}</div>`);
        }
        else if (template == 'Template_3') {
            $('.t3 .interest').append(`<li><span>${safeInterest}</span></li>`);
        }
    }

    //  **********    Languages    **********

    let lang_items = $('#accordionLang .accordion-item').length;
    for (let i = 0; i < lang_items; i++) {
        let lang = $(`#accordionLang .accordion-item:nth-child(${i + 1}) .lang`).val().trim();

        if (lang == "") {
            continue;
        }
        let safeLang = escapeHTML(lang);

        if (template == "Template_1") {
            $('.t1 .left_side .language ul').append(`<li><span class="text">${safeLang}</span></li>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower .lower_left .languages .content .con').append(`<div class="lang">${safeLang}</div>`);
        }
        else if (template == 'Template_3') {
            $('.t3 .content-box .languages').append(`<p class="p3">${safeLang}</p>`);
        }
    }

    //  **********    Achievements    **********

    let rawAchv = $(`#achv_description`).val().trim();
    if (rawAchv !== "") {
        let safeAchv = escapeAndFormatNewlines(rawAchv);
        if (template == "Template_1") {
            $('.t1 .right_side .achievements').append(`<p>${safeAchv}</p>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower_right .achievements .content .con').append(`<div class="val">${safeAchv}</div>`);
        }
        else if (template == 'Template_3') {
            $('.t3 .content-box').append(`<div class="achievements-box"><br /><p class="head">Achievements</p><p class="par-4">${safeAchv}</p></div>`);
        }
    }

    // ******************* Profile *******************

    let rawProfile = $(`#profile`).val().trim();
    if (rawProfile !== "") {
        let safeProfile = escapeAndFormatNewlines(rawProfile);
        if (template == "Template_1") {
            $('.t1 .right_side .prof').append(`<p>${safeProfile}</p>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower_right .profile').append(`<div class="content">${safeProfile}</div>`);
        }
        else if (template == 'Template_3') {
            $('.t3 .objective').html(safeProfile);
        }
    }
}