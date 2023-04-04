import { Link } from "@inertiajs/react";

const Paginator = ( {meta} ) => {
    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;
    return (
        <div className="btn-group">
            {prev && <Link href={prev} className="btn btn-inline">«</Link>}
            <Link className="btn btn-inline">{current}</Link>
            {next && <Link href={next} className="btn btn-inline">»</Link>}
        </div>
    )
}

export default Paginator