console.log('This is f1.js')

//Get Season information from the form 

{
        let form = document.getElementById('seasonForm');
        console.log(form);

        async function handleSubmit(e){
            console.log('Please wait...')
            e.preventDefault()


            let inputSeason = e.target.inputSeason.value;
            let inputRound = e.target.inputRound.value;
            
            let racersData = await getSeasonInfo(inputSeason, inputRound)
            inputSeason.value = ''
            inputRound.value = ''
            console.log('Please wait, retreiving data', racersData);

            buildf1Table(racersData)
            
        }

        async function getSeasonInfo(season, round){
            let res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
            let data = await res.json()
            return data['MRData']['StandingsTable']

}

//table should display: position, points,  driver name, driver nationality, and constructor name


        function buildf1Table(racersData){
            console.log('creating table....');
            let table = document.createElement('table');
            table.className = 'table';


            let thead = document.createElement('thead');
            

            let trHead = document.createElement('tr');
            

            let thPosition = document.createElement('th');
            thPosition.scope = 'col'
            thPosition.innerHTML = 'Driver Position'
            

            let thPoints = document.createElement('th');
            thPoints.scope = 'col'
            thPoints.innerHTML = 'total points'
            

            let thdriverName = document.createElement('th');
            thdriverName.scope = 'col'
            thdriverName.innerHTML = 'Driver name:'
            

            let thNational = document.createElement('th');
            thNational.scope = 'col'
            thNational.innerHTML = 'Driver Nationality'
            

            let thConstructor = document.createElement('th')
            thConstructor.scope = 'col'
            thConstructor.innerHTML = 'Constructor'
            

            let tableBody = document.createElement('tbody')
            ;

            racers = racersData.StandingsLists[0].DriverStandings
            for (racer in racers){
                let tableRow = document.createElement('tr');
                

                let tdPosit = document.createElement('td')
                tdPosit.scope = 'row'
                tdPosit.innerHTML = racers[racer]['position']

                let tdPoint = document.createElement('td')
                tdPoint.scope = 'row'
                tdPoint.innerHTML = racers[racer]['points']

                let tdDriverName = document.createElement('td')
                tdDriverName.innerHTML = `${racers[racer]['Driver']['givenName']} ${racers[racer]['Driver']['familyName']}`;

                let tdNational = document.createElement('td')
                tdNational.innerHTML = racers[racer]['Driver']['nationality'];

                let tdConstructor = document.createElement('td')
                tdConstructor.innerHTML = racers[racer]['Constructors'][0]['name'];


                tableRow.append(tdPosit);
                tableRow.append(tdPoint);
                tableRow.append(tdDriverName);
                tableRow.append(tdNational);
                tableRow.append(tdConstructor);
                tableBody.append(tableRow);
        }

            thead.append(trHead)
            trHead.append(thPosition)
            trHead.append(thPoints)
            trHead.append(thdriverName)
            trHead.append(thNational)
            trHead.append(thConstructor)
            table.append(thead)
            table.append(tableBody)


            let display = document.getElementById('standingTable');
            display.innerHTML = '';
            display.append(table)



    }

        form.addEventListener('submit', handleSubmit);

}


