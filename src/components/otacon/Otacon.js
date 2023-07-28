export default function Otacon({otacon}) {

    // All sprites are from https://www.spriters-resource.com/playstation_2/mgs2/sheet/189420/
    // cropped, upscaled with Photoshop and animated by myself with Premiere Pro
    return (
        <div className='otacon'>
            <img className='animations' src={otacon.src} alt='Otacon animations'/>
        </div>
    )
}