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
            $(`#${template} #t_dob`).html(formattedDob);
        } else {
            $(`#${template} #t_dob`).html('');
        }
    } else {
        $(`#${template} #t_dob`).html('');
    }

    $(`#${template} #t_name`).html($('#fname').val() + " " + $('#lname').val());
    $(`#${template} #t_gender`).html($('#gender').val());
    $(`#${template} #t_email`).html($('#email').val());
    $(`#${template} #t_number`).html($('#number').val());

    let cityVal = $('#city').val();
    let stateVal = $('#state').val();
    let countryVal = $('#country').val();
    let addressLine = $('#address').val() + "<br>" + $('#zip').val() + "<br>" + (cityVal ? cityVal + ", " : "") + (stateVal ? stateVal + ", " : "") + (countryVal ? countryVal : "");
    $(`#${template} #t_address`).html(addressLine);

    if ($('#website').val().trim() == "") {
        $(`#${template} #t_website`).parent().css('display', 'none');
    }
    else {
        $(`#${template} #t_website`).parent().css('display', 'block');
        $(`#${template} #t_website`).html($('#website').val());
    }

    if ($('#linkedIn').val().trim() == "") {
        $(`#${template} #t_linkedIn`).parent().css('display', 'none');
    }
    else {
        $(`#${template} #t_linkedIn`).parent().css('display', 'block');
        $(`#${template} #t_linkedIn`).html($('#linkedIn').val());
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

        let displayDate = dateStr ? dateStr : "";

        if (template == "Template_1") {
            $('.t1 .left_side .education ul').append(`<li>
            ${displayDate ? `<h5>${displayDate}</h5>` : ''}
            ${degree ? `<h4>${degree}</h4>` : ''}
            ${school ? `<h4>${school}</h4>` : ''}
            </li>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower_right .education .content').append(`
            <div class="con">
                ${displayDate ? `<h4 class="time">${displayDate}</h4>` : ''}
                ${degree ? `<h4 class="degree">${degree}</h4>` : ''}
                ${school ? `<h4 class="uni">${school}</h4>` : ''}
            </div>`);
        }
        else if (template == 'Template_3') {
            let degDate = degree + (displayDate ? ` (${displayDate})` : '');
            $('.t3 .education').append(`<p class="degree">${degDate}</p><p class="par-4">${school}</p>`);
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

        let displayDate = dateStr ? dateStr : "";

        if (template == "Template_1") {
            $('.t1 .right_side .experience').append(
                `<div class="box">
                <div class="year_company">
                    ${displayDate ? `<h5>${displayDate}</h5>` : ''}
                    ${company_name ? `<h5>${company_name}</h5>` : ''}
                </div>
                <div class="text">
                    ${job_title ? `<h4>${job_title}</h4>` : ''}
                    ${work_desc ? `<p>${work_desc}</p>` : ''}
                </div>
            </div>`
            );
        }
        else if (template == 'Template_2') {
            $('.t2 .lower_right .experience .content').append(`<div class="con">
            <div class="time">${displayDate ? `<h4>${displayDate}</h4>` : ''}${company_name ? `<h4>${company_name}</h4>` : ''}</div>
            <div class="box"><div class="text">${job_title}</div><div class="exp">${work_desc}</div></div>
        </div>`);
        }
        else if (template == 'Template_3') {
            let titleComp = job_title + (company_name ? ` at ${company_name}` : '') + (displayDate ? ` (${displayDate})` : '');
            $('.t3 .content-box .experience').append(`<p class="job-title">${titleComp}</p>
            <p class="par-4">${work_desc}</p>`);
        }
    }

    //  **********    Skills    **********

    let skill_items = $('#accordionSkill .accordion-item').length;
    for (let i = 0; i < skill_items; i++) {
        let skill = $(`#accordionSkill .accordion-item:nth-child(${i + 1}) .skill`).val().trim();

        if (skill == "") {
            continue;
        }
        if (template == "Template_1") {
            $('.t1 .right_side .skills .box').append(`<h4>${skill}</h4>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower .lower_left .skills .content').append(`<div class="skill">${skill}</div>`);
        }
        else if (template == 'Template_3') {
            $('.t3 .skills').append(`<li><span>${skill}</span></li>`);
        }
    }

    //  **********    Interest    **********

    let interest_items = $('#accordionInt .accordion-item').length;
    for (let i = 0; i < interest_items; i++) {
        let interest = $(`#accordionInt .accordion-item:nth-child(${i + 1}) .hobby`).val().trim();

        if (interest == "") {
            continue;
        }

        if (template == "Template_1") {
            $('.t1 .right_side .interest ul').append(`
            <li>${interest}</li>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower .lower_left .interests .content').append(`<div class="con">${interest}</div>`);
        }
        else if (template == 'Template_3') {
            $('.t3 .interest').append(`<li><span>${interest}</span></li>`);
        }
    }

    //  **********    Languages    **********

    let lang_items = $('#accordionLang .accordion-item').length;
    for (let i = 0; i < lang_items; i++) {
        let lang = $(`#accordionLang .accordion-item:nth-child(${i + 1}) .lang`).val().trim();

        if (lang == "") {
            continue;
        }

        if (template == "Template_1") {
            $('.t1 .left_side .language ul').append(`<li><span class="text">${lang}</span></li>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower .lower_left .languages .content .con').append(`<div class="lang">${lang}</div>`);
        }
        else if (template == 'Template_3') {
            $('.t3 .content-box .languages').append(`<p class="p3">${lang}</p>`);
        }
    }

    //  **********    Achievements    **********

    let achv = $(`#achv_description`).val().replaceAll("\n", "<br />\r\n");

    if (achv !== "") {
        if (template == "Template_1") {
            $('.t1 .right_side .achievements').append(`<p>${achv}</p>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower_right .achievements .content .con').append(`<div class="val">${achv}</div>`);
        }
        else if (template == 'Template_3') {
            $('.t3 .content-box').append(`<div class="achievements-box"><br /><p class="head">Achievements</p><p class="par-4">${achv}</p></div>`);
        }
    }

    // ******************* Profile *******************

    let profile = $(`#profile`).val().replaceAll("\n", "<br />\r\n");
    if (profile !== "") {
        if (template == "Template_1") {
            $('.t1 .right_side .prof').append(`<p>${profile}</p>`);
        }
        else if (template == 'Template_2') {
            $('.t2 .lower_right .profile').append(`<div class="content">${profile}</div>`);
        }
        else if (template == 'Template_3') {
            $('.t3 .objective').html(`${profile}`);
        }
    }
}