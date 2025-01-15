<script lang="ts">
    let rovarsprak = "";
    let karpsravor = "";
    let warning = "";

    function warn() {
        let warning = "";
        warning += rovarsprak.toLowerCase().includes("ti") ? "'ti' " : ""
        warning += rovarsprak.toLowerCase().includes("ji") ? "'ji' " : ""
        warning += rovarsprak.toLowerCase().includes("wo") ? "'wo' " : ""
        warning += rovarsprak.toLowerCase().includes("wu") ? "'wu' " : ""
    }

    function translateA() {
        karpsravor = rovarsprak
        // prefix uppercase with naming mark
        .replaceAll(/([A-Z])/g, "ᕐ$1")
        // convert each syllable
        .replaceAll(/we/gi, "ᕓ")
        .replaceAll(/wi/gi, "ᕕ")
        .replaceAll(/wa/gi, "ᕙ")

        .replaceAll(/je/gi, "ᔦ")
        .replaceAll(/jo/gi, "ᔪ")
        .replaceAll(/ju/gi, "ᔫ")
        .replaceAll(/ja/gi, "ᔭ")

        .replaceAll(/se/gi, "ᓭ")
        .replaceAll(/si/gi, "ᓯ")
        .replaceAll(/so/gi, "ᓱ")
        .replaceAll(/su/gi, "ᓲ")
        .replaceAll(/sa/gi, "ᓴ")
        
        .replaceAll(/le/gi, "ᓓ")
        .replaceAll(/li/gi, "ᓕ")
        .replaceAll(/lo/gi, "ᓗ")
        .replaceAll(/lu/gi, "ᓘ")
        .replaceAll(/la/gi, "ᓚ")

        .replaceAll(/ne/gi, "ᓀ")
        .replaceAll(/ni/gi, "ᓂ")
        .replaceAll(/no/gi, "ᓄ")
        .replaceAll(/nu/gi, "ᓅ")
        .replaceAll(/na/gi, "ᓇ")

        .replaceAll(/me/gi, "ᒣ")
        .replaceAll(/mi/gi, "ᒥ")
        .replaceAll(/mo/gi, "ᒧ")
        .replaceAll(/mu/gi, "ᒨ")
        .replaceAll(/ma/gi, "ᒪ")

        .replaceAll(/ke/gi, "ᑫ")
        .replaceAll(/ki/gi, "ᑭ")
        .replaceAll(/ko/gi, "ᑯ")
        .replaceAll(/ku/gi, "ᑰ")
        .replaceAll(/ka/gi, "ᑲ")

        .replaceAll(/te/gi, "ᑌ")
        .replaceAll(/to/gi, "ᑐ")
        .replaceAll(/tu/gi, "ᑑ")
        .replaceAll(/ta/gi, "ᑕ")

        .replaceAll(/pe/gi, "ᐯ")
        .replaceAll(/pi/gi, "ᐱ")
        .replaceAll(/po/gi, "ᐳ")
        .replaceAll(/pu/gi, "ᐴ")
        .replaceAll(/pa/gi, "ᐸ")

        .replaceAll(/e/gi, "ᐁ")
        .replaceAll(/i/gi, "ᐃ")
        .replaceAll(/o/gi, "ᐅ")
        .replaceAll(/u/gi, "ᐆ")
        .replaceAll(/a/gi, "ᐊ")

        .replaceAll(/n/gi, "ᓐ")

        .replaceAll(/0/gi, "■")
        .replaceAll(/1/gi, "▶")
        .replaceAll(/2/gi, "◥")
        .replaceAll(/3/gi, "▲")
        .replaceAll(/4/gi, "◤")
        .replaceAll(/5/gi, "◀")
        .replaceAll(/6/gi, "◣")
        .replaceAll(/7/gi, "▼")
        .replaceAll(/8/gi, "◢")
        .replaceAll(/9/gi, "◆")
        
        warn()
    }

    function translateB() {
        rovarsprak = karpsravor
        // convert each syllable
        .replaceAll("ᕓ", "we")
        .replaceAll("ᕕ", "wi")
        .replaceAll("ᕙ", "wa")

        .replaceAll("ᔦ", "je")
        .replaceAll("ᔪ", "jo")
        .replaceAll("ᔫ", "ju")
        .replaceAll("ᔭ", "ja")

        .replaceAll("ᓭ", "se")
        .replaceAll("ᓯ", "si")
        .replaceAll("ᓱ", "so")
        .replaceAll("ᓲ", "su")
        .replaceAll("ᓴ", "sa")
        
        .replaceAll("ᓓ", "le")
        .replaceAll("ᓕ", "li")
        .replaceAll("ᓗ", "lo")
        .replaceAll("ᓘ", "lu")
        .replaceAll("ᓚ", "la")

        .replaceAll("ᓀ", "ne")
        .replaceAll("ᓂ", "ni")
        .replaceAll("ᓄ", "no")
        .replaceAll("ᓅ", "nu")
        .replaceAll("ᓇ", "na")

        .replaceAll("ᒣ", "me")
        .replaceAll("ᒥ", "mi")
        .replaceAll("ᒧ", "mo")
        .replaceAll("ᒨ", "mu")
        .replaceAll("ᒪ", "ma")

        .replaceAll("ᑫ", "ke")
        .replaceAll("ᑭ", "ki")
        .replaceAll("ᑯ", "ko")
        .replaceAll("ᑰ", "ku")
        .replaceAll("ᑲ", "ka")

        .replaceAll("ᑌ", "te")
        .replaceAll("ᑐ", "to")
        .replaceAll("ᑑ", "tu")
        .replaceAll("ᑕ", "ta")

        .replaceAll("ᐯ", "pe")
        .replaceAll("ᐱ", "pi")
        .replaceAll("ᐳ", "po")
        .replaceAll("ᐴ", "pu")
        .replaceAll("ᐸ", "pa")

        .replaceAll("ᐁ", "e")
        .replaceAll("ᐃ", "i")
        .replaceAll("ᐅ", "o")
        .replaceAll("ᐆ", "u")
        .replaceAll("ᐊ", "a")

        .replaceAll("ᓐ", "n")

        .replaceAll("■", "0")
        .replaceAll("▶", "1")
        .replaceAll("◥", "2")
        .replaceAll("▲", "3")
        .replaceAll("◤", "4")
        .replaceAll("◀", "5")
        .replaceAll("◣", "6")
        .replaceAll("▼", "7")
        .replaceAll("◢", "8")
        .replaceAll("◆", "9")

        // prefix uppercase with naming mark
        .replaceAll(/ᕐ([a-z])/g, (_, p1) => {return p1.toUpperCase()})

        warn()
    }
</script>

<textarea bind:value={rovarsprak} on:input={translateA} placeholder="type here" class="text-lg" cols="50" rows="10"></textarea>

<textarea bind:value={karpsravor} on:input={translateB} placeholder="syllabics here" class="text-lg" cols="50" rows="10"></textarea>

{#key warning}<p class="text-red">{warning !== '' ? warning+"is not legal" : ""}</p>{/key}