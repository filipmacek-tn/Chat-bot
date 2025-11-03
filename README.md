# Instrukcja uruchomienia


 1) Przejdź do katalogu projektu <br>
    cd "C:\path\to\school-assistant-starter"  //Przykładowa sciezka nalezy wpisac własna

 2) Zatrzymaj i wyczyść stare (jeśli coś było) <br>
    docker compose down -v --remove-orphans

 3) Walidacja plik u<br>
    docker compose config

 4) Zbuduj obrazy, które mają Dockerfile <br>
    docker compose build --no-cache backend frontend

 5) Podnieś Redis + Duckling <br>
     docker compose up -d redis duckling

 6) Jednorazowy trening modelu Rasa <br>
     docker compose run --rm rasa train      //W plikach umiesciłem juz przetrenowany wstepnie model na potrzeby sprint 0

 7) Start Rasa + Actions <br>
     docker compose up -d rasa actions

 8) Start Backend + Frontend <br>
     docker compose up -d backend frontend



## Każde kolejne uruchomienie wymaga tylko uruchomienia kontenera w dockerze 
