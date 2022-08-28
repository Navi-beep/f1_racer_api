console.log('This is f1.js')

//Get Season information from the form 

{
        let form = document.getElementById('seasonForm');
        console.log(form);

        async function handleSubmit(event){
            event.preventDefault();

            let inputSeason = event.target.season.value;
            let inputRound = event.target.round.value;
            
            let f1Data = await getSeasonInfo(inputSeason, inputRound)
            console.log('Please wait, retreiving data', f1Data);
            buildf1Table(f1Data)
            
        }

        async function getSeasonInfo(season, round){
            let res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
            let data = await res.json()
            return data['MRData']['StandingsTable']

}

//table should display: position, points,  driver name, driver nationality, and constructor name


        function buildf1Table(f1Data){
            console.log('creating table....');
            let table = document.createElement('table');
            table.className = 'table';


            let thead = document.createElement('thead');
            let trHead = document.createElement('tr');

            
            let thPoints = document.createElement('th');
            thPoints.scope = 'column'
            thPoints.innerHTML = 'total points:'
            
            
            let thPosit = document.createElement('th');
            thPosit.scope = 'column'
            thPosit.innerHTML = 'Driver Position:'

            
            let thdriver = document.createElement('th');
            thdriver.scope = 'column'
            thdriver.innerHTML = 'Driver name:'
            

            let thNational = document.createElement('th');
            thNational.scope = 'column'
            thNational.innerHTML = 'Driver Nationality:'
            

            let thConstructor = document.createElement('th')
            thConstructor.scope = 'column'
            thConstructor.innerHTML = 'Constructor:'
            

            let tableBody = document.createElement('tbody')
            ;

            racers = f1Data.StandingsLists[0].DriverStandings
            for (racer in racers){
                let tableRow = document.createElement('tr');
                
        
                let tdPoint = document.createElement('td')
                tdPoint.scope = 'row'
                tdPoint.innerHTML = racers[racer]['points']

                let tdPosit = document.createElement('td')
                tdPosit.scope = 'row'
                tdPosit.innerHTML = racers[racer]['position']

                let tdDriver = document.createElement('td')
                tdDriver.innerHTML = `${racers[racer]['Driver']['givenName']} ${racers[racer]['Driver']['familyName']}`;

                let tdNational = document.createElement('td')
                tdNational.innerHTML = racers[racer]['Driver']['nationality'];

                let tdConstructor = document.createElement('td')
                tdConstructor.innerHTML = racers[racer]['Constructors'][0]['name'];


                tableRow.append(tdPosit);
                tableRow.append(tdPoint);
                tableRow.append(tdDriver);
                tableRow.append(tdNational);
                tableRow.append(tdConstructor);
                tableBody.append(tableRow);
        }

            table.append(thead)
            table.append(tableBody)
            thead.append(trHead)
            trHead.append(thPosit)
            trHead.append(thPoints)
            trHead.append(thdriver)
            trHead.append(thNational)
            trHead.append(thConstructor)
            let display = document.getElementById('standingTable');
            display.innerHTML = '';
            display.append(table)

    }

        form.addEventListener('submit', handleSubmit);

}


